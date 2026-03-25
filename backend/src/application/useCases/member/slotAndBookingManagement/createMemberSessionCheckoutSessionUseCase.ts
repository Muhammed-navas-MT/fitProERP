import { stripe } from "../../../../infrastructure/services/stripeClient";
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

export class CreateMemberSessionCheckoutSessionUseCase implements ICreateMemberSessionCheckoutSessionUseCase {
  constructor(
    private _memberRepository: IMemberRepository,
    private _cacheService: ICacheService,
    private _sessionRepository: ISessionRepository,
  ) {}

  async execute(data: CreateMemberSessionCheckoutRequestDto): Promise<string> {
    const member = await this._memberRepository.findById(data.userId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    if (!member.branchId || !member.gymId) {
      throw new ForbiddenException(MemberError.DATA_MISSING);
    }

    if (!data.amount || data.amount <= 0) {
      throw new ForbiddenException("Invalid session amount");
    }

    const alreadyBooked = await this._sessionRepository.findOneBySlotAndDate(
      data.trainerId,
      data.slotId,
      new Date(data.sessionDate),
    );

    if (alreadyBooked) {
      throw new ForbiddenException(SlotAndBookingError.ALREADY_BOOKED);
    }

    const booked = await this._cacheService.getData(
      `${data.trainerId}:${data.sessionDate}:${data.slotId}`,
    );

    if (booked) {
      throw new ForbiddenException(SlotAndBookingError.ALREADY_BOOKED);
    }

    await this._cacheService.setData(
      `${data.trainerId}:${data.sessionDate}:${data.slotId}`,
      data.startTime,
      300,
    );

    const successUrl = `${process.env.CLIENT_PROTOCOL}://${data.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/member/book_trainer`;
    const cancelUrl = `${process.env.CLIENT_PROTOCOL}://${data.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/member/session-payment-cancel`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Personal Training Session",
              description: `Session Date: ${data.sessionDate}`,
            },
            unit_amount: Math.round(data.amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "session_booking",
        userId: data.userId,
        trainerId: data.trainerId,
        slotId: data.slotId,
        sessionDate: data.sessionDate,
        startTime: data.startTime,
        endTime: data.endTime,
        amount: String(data.amount),
        branchId: member.branchId.toString(),
        gymId: member.gymId.toString(),
        role: member.role,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session.url!;
  }
}
