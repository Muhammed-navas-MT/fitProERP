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
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
};

const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
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

  const differenceInTime = end.getTime() - start.getTime();

  return differenceInTime >= 0
    ? Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1
    : 0;
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

    const currentDate = new Date();
    const currentMonthStartDate = getStartOfMonth(currentDate);
    const currentMonthEndDate = getEndOfMonth(currentDate);

    const monthlyLeaves =
      await this._leaveRepository.findLeavesByTrainerIdAndDateRange(
        trainerId,
        currentMonthStartDate,
        currentMonthEndDate,
      );

    let usedLeavesThisMonth = 0;

    for (const leave of monthlyLeaves) {
      if (leave.status === LeaveStatus.REJECTED) continue;

      usedLeavesThisMonth += calculateOverlapDays(
        new Date(leave.startDate),
        new Date(leave.endDate),
        currentMonthStartDate,
        currentMonthEndDate,
      );
    }

    const allocatedLeavesThisMonth = trainer.allocatedLeaveCount ?? 0;
    const extraLeavesTaken = Math.max(
      usedLeavesThisMonth - allocatedLeavesThisMonth,
      0,
    );

    const isExceeded = extraLeavesTaken > 0;

    const exceededMessage = isExceeded
      ? `The monthly leave allocation has been exceeded. Allocated leave: ${allocatedLeavesThisMonth} days. Used leave this month: ${usedLeavesThisMonth} days. Extra leave taken: ${extraLeavesTaken} days.`
      : undefined;

    const response = LeaveMapper.toListAllLeavesDto(
      params,
      leaves,
      total,
      isExceeded,
      {
        allocatedLeavesThisMonth,
        usedLeavesThisMonth,
        extraLeavesTaken,
      },
      exceededMessage,
    );
    return response;
  }
}
