import Stripe from "stripe";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { ForbiddenException } from "../../../constants/exceptions";
import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { IMemberProcessSessionStripeWebhookUseCase } from "../../../interfaces/useCase/member/slotAndBookingManagement/memberProcessSessionStripeWebhookUseCaseInterface";
import { StripeError } from "../../../../presentation/shared/constants/messages/stripeMessages";
import { SlotAndBookingError } from "../../../../presentation/shared/constants/messages/slotAndBookingMessages";
import { ICacheService } from "../../../interfaces/service/cacheServiceInterface";
import { BookingMapper } from "../../../mappers/member/bookingMapper";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { Roles } from "../../../../domain/enums/roles";
import { ICreateNotificationUseCase } from "../../../interfaces/useCase/shared/notificationManagement/createNotificationUseCaseInterface";
import { NotificationType } from "../../../../domain/enums/notificationTypes";

export class MemberProcessSessionStripeWebhookUseCase implements IMemberProcessSessionStripeWebhookUseCase {
  constructor(
    private _sessionRepository: ISessionRepository,
    private _gymAdminRevenueRepository: IGymAdminRevenueRepository,
    private _cacheService: ICacheService,
    private _memberRepository: IMemberRepository,
    private _createNotificationUseCase: ICreateNotificationUseCase,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    if (event.type !== "checkout.session.completed") return;

    const stripeSession = event.data.object as Stripe.Checkout.Session;

    if (stripeSession.metadata?.type !== "session_booking") return;

    const userId = stripeSession.metadata?.userId;
    const trainerId = stripeSession.metadata?.trainerId;
    const slotId = stripeSession.metadata?.slotId;
    const date = stripeSession.metadata?.sessionDate;
    const startTime = stripeSession.metadata?.startTime;
    const endTime = stripeSession.metadata?.endTime;
    const amount = Number(stripeSession.metadata?.amount);
    const branchId = stripeSession.metadata?.branchId;
    const gymId = stripeSession.metadata?.gymId;

    if (
      !userId ||
      !trainerId ||
      !slotId ||
      !date ||
      !startTime ||
      !endTime ||
      !amount ||
      !branchId ||
      !gymId
    ) {
      throw new ForbiddenException(StripeError.METADATA_MISSING);
    }

    const alreadyProcessed =
      await this._gymAdminRevenueRepository.existsBySessionId(stripeSession.id);

    if (alreadyProcessed) return;

    const alreadyBooked = await this._sessionRepository.findOneBySlotAndDate(
      trainerId,
      slotId,
      new Date(date),
    );

    if (alreadyBooked) {
      throw new ForbiddenException(SlotAndBookingError.ALREADY_BOOKED);
    }

    await this._cacheService.deleteData(`${trainerId}:${date}:${slotId}`);

    const createdSessionId = await this._sessionRepository.create({
      memberId: userId,
      trainerId,
      slotId,
      date,
      startTime,
      endTime,
      amount,
      status: SessionStatus.CONFIRMED,
    });

    await this._memberRepository.incrementUsedSession(userId);

    const revenueEntity = BookingMapper.toEntityFromSession({
      gymId,
      branchId,
      userId,
      createdSessionId,
      stripeSession,
      amount,
    });

    await this._gymAdminRevenueRepository.create(revenueEntity);

    await this._createNotificationUseCase.execute({
      receiverId: trainerId,
      receiverRole: Roles.TRAINER,
      title: "New Session Booking",
      message: `A member booked a session on ${date} from ${startTime} to ${endTime}.`,
      type: NotificationType.SESSION_BOOKED,
      relatedId: createdSessionId,
      relatedModel: "Session",
      actionLink: "/trainer/sessions",
    });

    await this._createNotificationUseCase.execute({
      receiverId: userId,
      receiverRole: Roles.MEMBER,
      title: "Session Confirmed",
      message: `Your session is confirmed for ${date} from ${startTime} to ${endTime}.`,
      type: NotificationType.SESSION_BOOKED,
      relatedId: createdSessionId,
      relatedModel: "Session",
      actionLink: "/member/book_trainer",
    });
  }
}
