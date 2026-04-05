import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { SlotAndBookingError } from "../../../../presentation/shared/constants/messages/slotAndBookingMessages";
import {
  ForbiddenException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { CreateMemberSessionCheckoutRequestDto } from "../../../dtos/memberDto/slotAndBookingDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { ICacheService } from "../../../interfaces/service/cacheServiceInterface";
import { ICreateMemberSessionCheckoutSessionUseCase } from "../../../interfaces/useCase/member/slotAndBookingManagement/createMemberSessionCheckoutSessionUseCaseInterface";
import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { Roles } from "../../../../domain/enums/roles";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { ICreateNotificationUseCase } from "../../../interfaces/useCase/shared/notificationManagement/createNotificationUseCaseInterface";

export class CreateMemberSessionCheckoutSessionUseCase implements ICreateMemberSessionCheckoutSessionUseCase {
  constructor(
    private _memberRepository: IMemberRepository,
    private _cacheService: ICacheService,
    private _sessionRepository: ISessionRepository,
    private _stripeService: IStripeService,
    private _createNotificationUseCase: ICreateNotificationUseCase,
  ) {}

  async execute(data: CreateMemberSessionCheckoutRequestDto): Promise<string> {
    const member = await this._memberRepository.findById(data.userId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    if (!member.branchId || !member.gymId) {
      throw new ForbiddenException(MemberError.DATA_MISSING);
    }

    const alreadyBooked = await this._sessionRepository.findOneBySlotAndDate(
      data.trainerId,
      data.slotId,
      new Date(data.sessionDate),
    );

    if (alreadyBooked) {
      throw new ForbiddenException(SlotAndBookingError.ALREADY_BOOKED);
    }

    const cacheKey = `${data.trainerId}:${data.sessionDate}:${data.slotId}`;

    const booked = await this._cacheService.getData(cacheKey);

    if (booked) {
      throw new ForbiddenException(SlotAndBookingError.ALREADY_BOOKED);
    }

    await this._cacheService.setData(cacheKey, data.startTime, 300);

    const sessionCount = member.package?.sessionCount ?? 0;
    const usedSession = member.package?.usedSession ?? 0;

    const hasRemainingPackageSessions = usedSession < sessionCount;

    if (hasRemainingPackageSessions) {
      const sessionId = await this._sessionRepository.create({
        memberId: data.userId,
        trainerId: data.trainerId,
        slotId: data.slotId,
        date: data.sessionDate,
        startTime: data.startTime,
        endTime: data.endTime,
        amount: 0,
        status: SessionStatus.CONFIRMED,
      });

      await this._memberRepository.incrementUsedSession(data.userId);

      await this._cacheService.deleteData(cacheKey);

      await this._createNotificationUseCase.execute({
        receiverId: data.trainerId,
        receiverRole: Roles.TRAINER,
        title: "New Session Booking",
        message: `A member booked a session on ${data.sessionDate} from ${data.startTime} to ${data.endTime}.`,
        type: NotificationType.SESSION_BOOKED,
        relatedId: sessionId,
        relatedModel: "Session",
        actionLink: "/trainer/sessions",
      });

      await this._createNotificationUseCase.execute({
        receiverId: data.userId,
        receiverRole: Roles.MEMBER,
        title: "Session Confirmed",
        message: `Your session is confirmed for ${data.sessionDate} from ${data.startTime} to ${data.endTime}.`,
        type: NotificationType.SESSION_BOOKED,
        relatedId: sessionId,
        relatedModel: "Session",
        actionLink: "/member/book_trainer",
      });
      return "BOOKED_WITH_PACKAGE";
    }

    if (!data.amount || data.amount <= 0) {
      throw new ForbiddenException("Invalid session amount");
    }

    const successUrl = `${process.env.CLIENT_PROTOCOL}://${data.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/member/book_trainer`;
    const cancelUrl = `${process.env.CLIENT_PROTOCOL}://${data.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/member/session-payment-cancel`;

    const { url } = await this._stripeService.createCheckoutSession({
      amount: data.amount,
      sessionDate: data.sessionDate,
      userId: data.userId,
      trainerId: data.trainerId,
      slotId: data.slotId,
      startTime: data.startTime,
      endTime: data.endTime,
      branchId: member.branchId.toString(),
      gymId: member.gymId.toString(),
      role: member.role,
      successUrl,
      cancelUrl,
    });

    return url;
  }
}
