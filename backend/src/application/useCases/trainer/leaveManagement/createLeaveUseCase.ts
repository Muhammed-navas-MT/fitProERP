import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import {
  NOtFoundException,
  BadRequestException,
} from "../../../constants/exceptions";
import { CreateLeaveRequestDto } from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { ICreateLeaveUseCase } from "../../../interfaces/useCase/trainer/leaveManagement/createLeaveUseCaseInterface";
import { LeaveMapper } from "../../../mappers/trainer/leaveMapper";

export class CreateLeaveUseCase implements ICreateLeaveUseCase {
  constructor(
    private _leaveRepository: ILeaveRepository,
    private _trainerRepository: ITrainerRepository,
  ) {}

  async execute(data: CreateLeaveRequestDto): Promise<void> {
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

    console.log(existingLeave);
    if (existingLeave.length !== 0) {
      throw new BadRequestException(LeaveError.LEAVE_ALREADY_EXISTS);
    }

    const leaveDate = LeaveMapper.toLeaveEntity(
      {
        ...data,
        startDate,
        endDate,
      },
      trainer.gymId,
    );

    await this._leaveRepository.create(leaveDate);
  }
}
