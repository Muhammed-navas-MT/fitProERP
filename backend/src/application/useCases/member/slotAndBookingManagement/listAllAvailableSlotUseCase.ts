import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { AvailableSlotResponseDto } from "../../../dtos/memberDto/slotAndBookingDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { IRRuleService } from "../../../interfaces/service/RRuleserviceInterface";
import { IListAllAvailableSlotUseCase } from "../../../interfaces/useCase/member/slotAndBookingManagement/listAllAvailableSlotUseCaseInterface";

interface SlotDay {
  date: string;
  slots: {
    slotId: string;
    startTime: string;
    endTime: string;
    amount: number;
    isBooked: boolean;
  }[];
}

export class ListAllAvailableSlotUseCase implements IListAllAvailableSlotUseCase {
  constructor(
    private _memberRepository: IMemberRepository,
    private _slotRuleRepository: ISlotRuleRepository,
    private _rRuleService: IRRuleService,
    private _sessionRepository: ISessionRepository,
  ) {}

  async execute(memberId: string): Promise<AvailableSlotResponseDto> {
    const member = await this._memberRepository.findById(memberId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const trainerId = member.trainerId;

    const slotRule = await this._slotRuleRepository.findByTrainerId(trainerId);

    const result: AvailableSlotResponseDto = {
      trainerId,
      slots: [],
    };

    if (!slotRule || !slotRule.isActive) {
      return result;
    }

    const dates = this._rRuleService.getDatesFromRRule(slotRule.rrule);
    console.log(dates);

    if (!dates.length) {
      return result;
    }

    const sessions = await this._sessionRepository.findByTrainerIdAndDates(
      trainerId,
      dates,
    );

    const bookedStatuses = new Set([
      SessionStatus.PENDING,
      SessionStatus.CONFIRMED,
      SessionStatus.COMPLETED,
    ]);

    const bookedSet = new Set(
      sessions
        .filter((session) => bookedStatuses.has(session.status))
        .map((session) => `${session.date}_${session.startTime}`),
    );

    const dateMap = new Map<string, SlotDay>();

    for (const date of dates) {
      if (!dateMap.has(date)) {
        dateMap.set(date, {
          date,
          slots: [],
        });
      }

      const dayEntry = dateMap.get(date)!;

      for (const slot of slotRule.slots) {
        const bookingKey = `${date}_${slot.startTime}`;

        dayEntry.slots.push({
          slotId: String(slot._id),
          startTime: slot.startTime,
          endTime: slot.endTime,
          amount: slot.amount,
          isBooked: bookedSet.has(bookingKey),
        });
      }
    }

    result.slots = Array.from(dateMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    return result;
  }
}
