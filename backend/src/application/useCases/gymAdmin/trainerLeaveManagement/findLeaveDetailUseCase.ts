import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { FindTrainerLeaveResponseDto } from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IFindTrainerLeaveUseCase } from "../../../interfaces/useCase/gymAdmin/TrainerLeaveManagement/findLeaveDetailUseCaseInterface";
import { LeaveMapper } from "../../../mappers/trainer/leaveMapper";

const normalizeDate = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getMonthKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  return `${year}-${month}`;
};

const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const getNextMonthStart = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

const calculateOverlapDays = (
  leaveStart: Date,
  leaveEnd: Date,
  rangeStart: Date,
  rangeEnd: Date,
): number => {
  const start = normalizeDate(
    leaveStart > rangeStart ? leaveStart : rangeStart,
  );
  const end = normalizeDate(leaveEnd < rangeEnd ? leaveEnd : rangeEnd);

  const diff = end.getTime() - start.getTime();

  return diff >= 0 ? Math.floor(diff / (1000 * 60 * 60 * 24)) + 1 : 0;
};

const splitLeaveDaysByMonth = (
  startDate: Date,
  endDate: Date,
): Record<string, number> => {
  const result: Record<string, number> = {};

  let cursor = getStartOfMonth(startDate);
  const finalMonthStart = getStartOfMonth(endDate);

  while (cursor <= finalMonthStart) {
    const monthStart = getStartOfMonth(cursor);
    const monthEnd = getEndOfMonth(cursor);
    const key = getMonthKey(cursor);

    const days = calculateOverlapDays(startDate, endDate, monthStart, monthEnd);

    if (days > 0) {
      result[key] = (result[key] ?? 0) + days;
    }

    cursor = getNextMonthStart(cursor);
  }

  return result;
};

export class FindTrainerLeaveUseCase implements IFindTrainerLeaveUseCase {
  constructor(
    private _leaveRepository: ILeaveRepository,
    private _trainerRepository: ITrainerRepository,
  ) {}

  async execute(leaveId: string): Promise<FindTrainerLeaveResponseDto> {
    const leave = await this._leaveRepository.findTrainerLeaveDetail(leaveId);

    if (!leave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }

    const trainer = await this._trainerRepository.findById(
      leave.trainerDetail._id,
    );

    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    const leaveStartDate = normalizeDate(new Date(leave.startDate));
    const leaveEndDate = normalizeDate(new Date(leave.endDate));

    const rangeStart = getStartOfMonth(leaveStartDate);
    const rangeEnd = getEndOfMonth(leaveEndDate);

    const monthlyLeaves =
      await this._leaveRepository.findLeavesByTrainerIdAndDateRange(
        leave.trainerDetail._id,
        rangeStart,
        rangeEnd,
      );

    const monthlyUsedMap: Record<string, number> = {};

    for (const item of monthlyLeaves) {
      const itemStartDate = normalizeDate(new Date(item.startDate));
      const itemEndDate = normalizeDate(new Date(item.endDate));

      const monthlySplit = splitLeaveDaysByMonth(itemStartDate, itemEndDate);

      for (const [month, days] of Object.entries(monthlySplit)) {
        monthlyUsedMap[month] = (monthlyUsedMap[month] ?? 0) + days;
      }
    }

    let isExided = false;
    let Exidedmessage: string | undefined;

    for (const [month, usedDays] of Object.entries(monthlyUsedMap)) {
      if (usedDays > trainer.allocatedLeaveCount) {
        isExided = true;
        Exidedmessage = `Allocated leave exceeded in ${month}. Allowed: ${trainer.allocatedLeaveCount}, Used: ${usedDays}`;
        break;
      }
    }

    return LeaveMapper.toTrainerLeaveDetailDto(leave, isExided, Exidedmessage);
  }
}
