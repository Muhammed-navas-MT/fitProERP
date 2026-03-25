import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import {
  AvailableSlotRequestDto,
  AvailableSlotResponseDto,
} from "../../../dtos/memberDto/slotAndBookingDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { ICacheService } from "../../../interfaces/service/cacheServiceInterface";
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
    private _cacheService: ICacheService,
  ) {}

  private _getTodayDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  private _getCurrentTimeString(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  async execute(
    params: AvailableSlotRequestDto,
  ): Promise<AvailableSlotResponseDto> {
    const member = await this._memberRepository.findById(params.memberId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const trainerId = params.trainerId ? params.trainerId : member.trainerId;

    const slotRule = await this._slotRuleRepository.findByTrainerId(trainerId);

    const result: AvailableSlotResponseDto = {
      trainerId,
      slots: [],
    };

    if (!slotRule || !slotRule.isActive) {
      return result;
    }

    const allDates = this._rRuleService.getDatesFromRRule(slotRule.rrule);

    if (!allDates.length) {
      return result;
    }

    const today = this._getTodayDateString();
    const currentTime = this._getCurrentTimeString();

    const filteredDates = allDates.filter((date) => date >= today);

    if (!filteredDates.length) {
      return result;
    }

    const sessions = await this._sessionRepository.findByTrainerIdAndDates(
      trainerId,
      filteredDates,
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

    for (let i = 0; i < 2; i++) {
      const currentAndFutureSlots = slotRule.slots.filter((slot) => {
        if (filteredDates[i] > today) return true;
        return slot.startTime >= currentTime;
      });

      if (!currentAndFutureSlots.length) continue;

      const slots = await Promise.all(
        currentAndFutureSlots.map(async (slot) => {
          const bookingKey = `${filteredDates[i]}_${slot.startTime}`;

          const redisKey = `${trainerId}:${filteredDates[i]}:${slot._id}`;
          const lockedSlot = await this._cacheService.getData(redisKey);

          return {
            slotId: String(slot._id),
            startTime: slot.startTime,
            endTime: slot.endTime,
            amount: slot.amount,
            isBooked: bookedSet.has(bookingKey) || !!lockedSlot,
          };
        }),
      );

      dateMap.set(filteredDates[i], {
        date: filteredDates[i],
        slots,
      });
    }

    result.slots = Array.from(dateMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    return result;
  }
}
