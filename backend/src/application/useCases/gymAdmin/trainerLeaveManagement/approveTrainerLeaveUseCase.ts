import { LeaveStatus } from "../../../../domain/enums/leaveStatus";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { Roles } from "../../../../domain/enums/roles";
import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { IApproveTrainerLeaveUseCase } from "../../../interfaces/useCase/gymAdmin/TrainerLeaveManagement/approvedLeaveUseCaseInterface";

export class ApproveTrainerLeaveUseCase implements IApproveTrainerLeaveUseCase {
  constructor(
    private _leaveRepository: ILeaveRepository,
    private _notificationService: INotificationService,
  ) {}

  async execute(leaveId: string): Promise<void> {
    const leave = await this._leaveRepository.findById(leaveId);

    if (!leave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }

    if (leave.status !== LeaveStatus.PENDING) {
      throw new BadRequestException(LeaveError.ALREADY_PROCESSED);
    }

    await this._leaveRepository.update(
      { status: LeaveStatus.APPROVED },
      leaveId,
    );
    await this._notificationService.notify({
      receiverId: leave.trainerId.toString(),
      receiverRole: Roles.TRAINER,
      title: "Leave Approved",
      message: `Your leave from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been approved.`,
      type: NotificationType.LEAVE_APPROVED,
      relatedId: leaveId,
      relatedModel: "Leave",
      actionLink: "/trainer/leaves",
    });
  }
}
