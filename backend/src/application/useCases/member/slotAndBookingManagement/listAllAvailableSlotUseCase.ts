import { LeaveStatus } from "../../../../domain/enums/leaveStatus";
import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import {
  AvailableSlotRequestDto,
  AvailableSlotResponseDto,
} from "../../../dtos/memberDto/slotAndBookingDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
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
    private _leaveRepository: ILeaveRepository,
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

    const futureDates = allDates.filter((date) => date >= today);

    if (!futureDates.length) {
      return result;
    }

    const rangeStart = new Date(futureDates[0]);
    const rangeEnd = new Date(futureDates[futureDates.length - 1]);

    const leaves =
      await this._leaveRepository.findLeavesByTrainerIdAndDateRange(
        trainerId,
        rangeStart,
        rangeEnd,
      );

    const leaveStatuses = new Set([LeaveStatus.APPROVED, LeaveStatus.PENDING]);

    const leaveDateSet = new Set<string>();

    for (const leave of leaves) {
      if (!leaveStatuses.has(leave.status)) continue;

      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);

      const cursor = new Date(start);
      cursor.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      while (cursor <= end) {
        const year = cursor.getFullYear();
        const month = String(cursor.getMonth() + 1).padStart(2, "0");
        const day = String(cursor.getDate()).padStart(2, "0");
        leaveDateSet.add(`${year}-${month}-${day}`);

        cursor.setDate(cursor.getDate() + 1);
      }
    }

    const filteredDates = futureDates.filter((date) => !leaveDateSet.has(date));

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

    for (let i = 0; i < Math.min(2, filteredDates.length); i++) {
      const currentDate = filteredDates[i];

      const currentAndFutureSlots = slotRule.slots.filter((slot) => {
        if (currentDate > today) return true;
        return slot.startTime >= currentTime;
      });

      if (!currentAndFutureSlots.length) continue;

      const slots = await Promise.all(
        currentAndFutureSlots.map(async (slot) => {
          const bookingKey = `${currentDate}_${slot.startTime}`;
          const redisKey = `${trainerId}:${currentDate}:${slot._id}`;
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

      dateMap.set(currentDate, {
        date: currentDate,
        slots,
      });
    }

    result.slots = Array.from(dateMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    return result;
  }
}
