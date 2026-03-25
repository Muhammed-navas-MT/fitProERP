import {
  ListLeavesRequestDto,
  ListLeavesResponseDto,
} from "../../../dtos/shared/leaveDto";
import { NOtFoundException } from "../../../constants/exceptions";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListAllLeavesUseCase } from "../../../interfaces/useCase/trainer/leaveManagement/listAllLeavesUseCaseInterface";
import { LeaveMapper } from "../../../mappers/trainer/leaveMapper";
import { LeaveStatus } from "../../../../domain/enums/leaveStatus";

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

  let cursor = normalizeDate(startDate);
  const finalDate = normalizeDate(endDate);

  while (cursor <= finalDate) {
    const monthStart = getStartOfMonth(cursor);
    const monthEnd = getEndOfMonth(cursor);
    const key = getMonthKey(cursor);

    const days = calculateOverlapDays(startDate, endDate, monthStart, monthEnd);

    result[key] = (result[key] ?? 0) + days;
    cursor = getNextMonthStart(cursor);
  }

  return result;
};

export class ListAllLeaveUseCase implements IListAllLeavesUseCase {
  constructor(
    private _leaveRepository: ILeaveRepository,
    private _trainerRepository: ITrainerRepository,
  ) {}

  async execute(
    params: ListLeavesRequestDto,
    trainerId: string,
  ): Promise<ListLeavesResponseDto> {
    const trainer = await this._trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new NOtFoundException("Trainer not found");
    }

    const { leaves, total } =
      await this._leaveRepository.findAllLeavesByTrainerId(params, trainerId);

    const currentMonthKey = getMonthKey(new Date());

    const monthlyMap: Record<string, number> = {};

    for (const item of leaves) {
      if (item.status === LeaveStatus.REJECTED) continue;

      const monthlySplit = splitLeaveDaysByMonth(
        new Date(item.startDate),
        new Date(item.endDate),
      );

      for (const [month, days] of Object.entries(monthlySplit)) {
        monthlyMap[month] = (monthlyMap[month] ?? 0) + days;
      }
    }

    let isExided = false;
    let exidedmessage: string | undefined;

    leaves.map((currentLeave) => {
      const currentLeaveSplit = splitLeaveDaysByMonth(
        new Date(currentLeave.startDate),
        new Date(currentLeave.endDate),
      );

      for (const month of Object.keys(currentLeaveSplit)) {
        const usedDays = monthlyMap[month] ?? 0;

        if (
          month === currentMonthKey &&
          usedDays > trainer.allocatedLeaveCount
        ) {
          isExided = true;
          exidedmessage = `The requested leave exceeds the monthly allocation. 
Allocated leave: ${trainer.allocatedLeaveCount} days. 
Total leave used: ${usedDays} days.
Please review your leave balance or seek approval from the management.`;
          break;
        }
      }
    });

    const response = LeaveMapper.toListAllLeavesDto(
      params,
      leaves,
      total,
      isExided,
      exidedmessage,
    );
    return response;
  }
}
