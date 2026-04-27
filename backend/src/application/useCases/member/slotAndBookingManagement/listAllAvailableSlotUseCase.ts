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

const DEFAULT_TIME_ZONE = "Asia/Kolkata";

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

function getDatePartsByTimeZone(
  date: Date = new Date(),
  timeZone: string = DEFAULT_TIME_ZONE,
): { date: string; time: string } {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);

  const get = (type: string): string =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

function isPastSlot(
  slotDate: string,
  startTime: string,
  timeZone: string = DEFAULT_TIME_ZONE,
): boolean {
  const now = getDatePartsByTimeZone(new Date(), timeZone);

  if (slotDate < now.date) return true;
  if (slotDate > now.date) return false;

  return startTime <= now.time;
}

function formatDateByTimeZone(
  date: Date,
  timeZone: string = DEFAULT_TIME_ZONE,
): string {
  return getDatePartsByTimeZone(date, timeZone).date;
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

    const { date: today } = getDatePartsByTimeZone(
      new Date(),
      DEFAULT_TIME_ZONE,
    );

    const futureDates = allDates.filter((date) => date >= today);

    if (!futureDates.length) {
      return result;
    }

    const rangeStart = new Date(`${futureDates[0]}T00:00:00`);
    const rangeEnd = new Date(
      `${futureDates[futureDates.length - 1]}T23:59:59`,
    );

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
        leaveDateSet.add(formatDateByTimeZone(cursor, DEFAULT_TIME_ZONE));
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
        return !isPastSlot(currentDate, slot.startTime, DEFAULT_TIME_ZONE);
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
