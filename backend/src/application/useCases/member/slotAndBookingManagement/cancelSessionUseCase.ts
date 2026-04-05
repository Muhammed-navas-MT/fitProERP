import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { SessionError } from "../../../../presentation/shared/constants/messages/sessionMessages";
import {
  NOtFoundException,
  BadRequestException,
} from "../../../constants/exceptions";
import { RefundStatus } from "../../../../domain/enums/refundStatus";
import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { ICancelSessionUseCase } from "../../../interfaces/useCase/member/slotAndBookingManagement/cancelSessionUseCaseInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { Roles } from "../../../../domain/enums/roles";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";

export class CancelSessionUseCase implements ICancelSessionUseCase {
  constructor(
    private _gymAdminRevenueRepository: IGymAdminRevenueRepository,
    private _sessionRepository: ISessionRepository,
    private _memberRepository: IMemberRepository,
    private _stripeService: IStripeService,
    private _notificationService: INotificationService,
  ) {}

  async execute(sessionId: string, memberId: string): Promise<void> {
    const [session, member] = await Promise.all([
      this._sessionRepository.findById(sessionId),
      this._memberRepository.findById(memberId),
    ]);

    if (!session) {
      throw new NOtFoundException(SessionError.NOT_FOUND);
    }
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    if (session.memberId.toString() !== memberId) {
      throw new BadRequestException(SessionError.NOT_FOUND);
    }
    if (session.status === SessionStatus.CANCELLED) {
      throw new BadRequestException(SessionError.ALREADY_CANCELLED);
    }
    if (session.status === SessionStatus.COMPLETED) {
      throw new BadRequestException(
        SessionError.COMPLETED_SESSION_CANNOT_CANCELLED,
      );
    }

    const sessionDateTime = new Date(`${session.date}T${session.startTime}:00`);
    const now = new Date();
    const diffInMs = sessionDateTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    if (diffInHours < 3) {
      throw new BadRequestException(SessionError.CANCELLED_3_HOURS_BEFORE);
    }

    const revenue =
      await this._gymAdminRevenueRepository.findBySessionId(sessionId);

    const sessionCount = member.package?.sessionCount ?? 0;
    const usedSession = member.package?.usedSession ?? 0;
    const isExtraPaidSession = usedSession > sessionCount;

    await this._sessionRepository.update(
      { status: SessionStatus.CANCELLED },
      sessionId,
    );

    if (usedSession > 0) {
      await this._memberRepository.decrementUsedSession(memberId);
    }
    const trainerId = session.trainerId.toString();

    if (!isExtraPaidSession) {
      await this._notificationService.notifyMany([
        {
          receiverId: memberId,
          receiverRole: Roles.MEMBER,
          title: "Session Cancelled",
          message: `Your session on ${session.date} has been cancelled.`,
          type: NotificationType.SESSION_CANCELLED,
          relatedId: sessionId,
          relatedModel: "Session",
          actionLink: "/member/book_trainer",
        },
        {
          receiverId: trainerId,
          receiverRole: Roles.TRAINER,
          title: "Session Cancelled",
          message: `A session scheduled on ${session.date} has been cancelled by the member.`,
          type: NotificationType.SESSION_CANCELLED,
          relatedId: sessionId,
          relatedModel: "Session",
          actionLink: "/trainer/sessions",
        },
      ]);
      return;
    }
    if (!revenue) return;
    if (!revenue.paymentIntentId) return;
    if (revenue.status !== PaymentStatus.PAID) return;
    if (revenue.refundStatus === RefundStatus.REFUNDED) return;

    const refund = await this._stripeService.createRefund({
      paymentIntentId: revenue.paymentIntentId,
      amount: revenue.amount,
    });

    await this._gymAdminRevenueRepository.update(
      { status: PaymentStatus.REFUNDED },
      revenue._id as string,
    );

    await this._gymAdminRevenueRepository.update(
      {
        refundId: refund.id,
        refundStatus: RefundStatus.REFUNDED,
        refundedAmount: refund.amount,
        refundedAt: new Date(),
      },
      revenue._id as string,
    );
    await this._notificationService.notifyMany([
      {
        receiverId: memberId,
        receiverRole: Roles.MEMBER,
        title: "Session Cancelled & Refunded",
        message: `Your session on ${session.date} has been cancelled. The refund has been processed successfully.`,
        type: NotificationType.SESSION_REFUNDED,
        relatedId: sessionId,
        relatedModel: "Session",
        actionLink: "/member/sessions",
      },
      {
        receiverId: trainerId,
        receiverRole: Roles.TRAINER,
        title: "Session Cancelled",
        message: `A session on ${session.date} has been cancelled and refunded to the member.`,
        type: NotificationType.SESSION_CANCELLED,
        relatedId: sessionId,
        relatedModel: "Session",
        actionLink: "/trainer/sessions",
      },
      {
        receiverId: member.gymId,
        receiverRole: Roles.GYMADMIN,
        title: "Session Cancelled & Refunded",
        message: `A session scheduled on ${session.date} has been cancelled. The member has been refunded successfully.`,
        type: NotificationType.SESSION_CANCELLED,
        relatedId: sessionId,
        relatedModel: "Session",
        actionLink: "/gym-admin/sessions",
      },
    ]);
  }
}
