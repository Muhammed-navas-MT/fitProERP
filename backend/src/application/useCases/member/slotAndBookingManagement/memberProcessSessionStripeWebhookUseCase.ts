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

export class MemberProcessSessionStripeWebhookUseCase implements IMemberProcessSessionStripeWebhookUseCase {
  constructor(
    private _sessionRepository: ISessionRepository,
    private _gymAdminRevenueRepository: IGymAdminRevenueRepository,
    private _cacheService: ICacheService,
    private _memberRepository: IMemberRepository,
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
  }
}
