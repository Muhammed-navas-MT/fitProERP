import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { UpdateLeaveRequestDto } from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { IUpdateLeaveUseCase } from "../../../interfaces/useCase/trainer/leaveManagement/updateLeaveUseCaseInterface";

export class UpdateLeaveUseCase implements IUpdateLeaveUseCase {
  constructor(private _leaveRepository: ILeaveRepository) {}
  async execute(data: UpdateLeaveRequestDto, leaveId: string): Promise<void> {
    const existLeave = await this._leaveRepository.findById(leaveId);
    if (!existLeave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }
    if (!data.reason || data.reason.trim().length === 0) {
      throw new BadRequestException(LeaveError.REASON_REQUIRED);
    }

    if (data.endDate && data.startDate && data.startDate > data.endDate) {
      throw new BadRequestException(LeaveError.INVALID_DATE_RANGE);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.startDate && data.startDate < today) {
      throw new BadRequestException(LeaveError.PAST_DATE_NOT_ALLOWED);
    }

    const existingLeave = await this._leaveRepository.findOverlappingLeave(
      data.trainerId,
      data.startDate,
      data.endDate,
    );

    if (existingLeave) {
      throw new BadRequestException(LeaveError.PAST_DATE_NOT_ALLOWED);
    }

    await this._leaveRepository.update(data, leaveId);
  }
}
