import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { UpdateLeaveRequestDto } from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IUpdateLeaveUseCase } from "../../../interfaces/useCase/trainer/leaveManagement/updateLeaveUseCaseInterface";

export class UpdateLeaveUseCase implements IUpdateLeaveUseCase {
  constructor(
    private _leaveRepository: ILeaveRepository,
    private _trainerRepository: ITrainerRepository,
  ) {}
  async execute(data: UpdateLeaveRequestDto, leaveId: string): Promise<void> {
    const existLeave = await this._leaveRepository.findById(leaveId);
    if (!existLeave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }
    const trainer = await this._trainerRepository.findById(data.trainerId);
    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    if (!data.reason || data.reason.trim().length === 0) {
      throw new BadRequestException(LeaveError.REASON_REQUIRED);
    }

    const startDate = new Date(data.startDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(data.endDate);
    endDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate > endDate) {
      throw new BadRequestException(LeaveError.INVALID_DATE_RANGE);
    }

    if (startDate < today) {
      throw new BadRequestException(LeaveError.PAST_DATE_NOT_ALLOWED);
    }

    const existingLeave = await this._leaveRepository.findOverlappingLeave(
      data.trainerId,
      startDate,
      endDate,
    );

    if (existingLeave) {
      throw new BadRequestException(
        LeaveError.LEAVE_ALREADY_EXISTS +
          " from " +
          startDate.toDateString() +
          " to " +
          endDate.toDateString(),
      );
    }

    await this._leaveRepository.update(
      { ...data, startDate, endDate },
      leaveId,
    );
  }
}
