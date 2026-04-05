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
import { IRejectTrainerLeaveUseCase } from "../../../interfaces/useCase/gymAdmin/TrainerLeaveManagement/rejectLeaveUseCaseInterface";

export class RejectTrainerLeaveUseCase implements IRejectTrainerLeaveUseCase {
  constructor(
    private _leaveRepository: ILeaveRepository,
    private _notificationService: INotificationService,
  ) {}

  async execute(leaveId: string, reason: string): Promise<void> {
    const leave = await this._leaveRepository.findById(leaveId);

    if (!leave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }

    if (leave.status !== LeaveStatus.PENDING) {
      throw new BadRequestException(LeaveError.ALREADY_PROCESSED);
    }

    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

    await this._leaveRepository.update(
      { rejectionReason: reason, status: LeaveStatus.REJECTED },
      leaveId,
    );

    await this._notificationService.notify({
      receiverId: leave.trainerId.toString(),
      receiverRole: Roles.TRAINER,
      title: "Leave Rejected",
      message: `Your leave from ${formatDate(
        leave.startDate,
      )} to ${formatDate(leave.endDate)} has been rejected. Reason: ${reason}`,
      type: NotificationType.LEAVE_REJECTED,
      relatedId: leaveId,
      relatedModel: "Leave",
      actionLink: "/trainer/leaves",
    });
  }
}
