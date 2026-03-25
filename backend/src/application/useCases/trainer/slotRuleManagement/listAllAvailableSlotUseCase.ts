import { AvailableSlotResponseDto } from "../../../dtos/trainerDto/slotRuleDtos";
import { ISlotRuleRepository } from "../../../interfaces/repository/trainer.ts/slotRuleRepoInterface";
import { IRRuleService } from "../../../interfaces/service/RRuleserviceInterface";
import { IListAllSlotUseCase } from "../../../interfaces/useCase/trainer/slotRuleManagement/listAllSlotUseCaseInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { SessionStatus } from "../../../../domain/enums/sessionStatus";

interface SlotDay {
  date: string;
  slots: {
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }[];
}

export class ListAllSlotUseCase implements IListAllSlotUseCase {
  constructor(
    private _slotRepository: ISlotRuleRepository,
    private _rRuleService: IRRuleService,
    private _sessionRepository: ISessionRepository,
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

  async execute(trainerId: string): Promise<AvailableSlotResponseDto> {
    const slotRule = await this._slotRepository.findByTrainerId(trainerId);

    const result: AvailableSlotResponseDto = {
      slots: [],
    };

    if (!slotRule || !slotRule.isActive) {
      return result;
    }

    const dates = this._rRuleService.getDatesFromRRule(slotRule.rrule);

    if (!dates.length) {
      return result;
    }

    const today = this._getTodayDateString();
    const currentTime = this._getCurrentTimeString();

    const filteredDates = dates.filter((date) => date >= today);

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

    for (const date of filteredDates) {
      const filteredSlots = slotRule.slots.filter((slot) => {
        if (date > today) return true;
        return slot.startTime >= currentTime;
      });

      dateMap.set(date, {
        date,
        slots: filteredSlots.map((slot) => {
          const bookingKey = `${date}_${slot.startTime}`;

          return {
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: bookedSet.has(bookingKey),
          };
        }),
      });
    }

    result.slots = Array.from(dateMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    return result;
  }
}
