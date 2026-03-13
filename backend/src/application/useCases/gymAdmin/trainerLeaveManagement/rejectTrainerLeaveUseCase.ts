import { LeaveStatus } from "../../../../domain/enums/leaveStatus";
import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { IRejectTrainerLeaveUseCase } from "../../../interfaces/useCase/gymAdmin/TrainerLeaveManagement/rejectLeaveUseCaseInterface";

export class RejectTrainerLeaveUseCase implements IRejectTrainerLeaveUseCase {
  constructor(private _leaveRepository: ILeaveRepository) {}

  async execute(leaveId: string, reason: string): Promise<void> {
    const leave = await this._leaveRepository.findById(leaveId);

    if (!leave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }

    if (leave.status !== LeaveStatus.PENDING) {
      throw new BadRequestException(LeaveError.ALREADY_PROCESSED);
    }

    await this._leaveRepository.update(
      { rejectionReason: reason, status: LeaveStatus.REJECTED },
      leaveId,
    );
  }
}
