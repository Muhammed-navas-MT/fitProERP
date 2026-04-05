import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { Roles } from "../../../../domain/enums/roles";
import { SessionError } from "../../../../presentation/shared/constants/messages/sessionMessages";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { IMarkAsCompletedUseCase } from "../../../interfaces/useCase/trainer/sessionManagement/markAsComplitedUseCaseInterface";
import { NotificationType } from "../../../../domain/enums/notificationTypes";

export class MarkAsCompletedUseCase implements IMarkAsCompletedUseCase {
  constructor(
    private _sessionRepository: ISessionRepository,
    private _notificationService: INotificationService,
  ) {}

  async execute(sessionId: string): Promise<void> {
    const session = await this._sessionRepository.findById(sessionId);

    if (!session) {
      throw new NOtFoundException(SessionError.NOT_FOUND);
    }

    const currentTime = new Date();

    const sessionEnd = new Date(session.date);
    const [hours, minutes] = session.endTime.split(":");

    sessionEnd.setHours(Number(hours), Number(minutes), 0, 0);

    if (currentTime < sessionEnd) {
      throw new BadRequestException(
        SessionError.CANNOT_COMPLETE_BEFORE_END_TIME,
      );
    }

    await this._sessionRepository.update(
      { status: SessionStatus.COMPLETED },
      sessionId,
    );

    await this._notificationService.notifyMany([
      {
        receiverId: session.memberId.toString(),
        receiverRole: Roles.MEMBER,
        title: "Session Completed",
        message: `Your session on ${session.date} from ${session.startTime} to ${session.endTime} has been marked as completed. Great job! 💪`,
        type: NotificationType.SESSION_COMPLETED,
        relatedId: sessionId,
        relatedModel: "Session",
        actionLink: "/member/sessions",
      },
      {
        receiverId: session.trainerId.toString(),
        receiverRole: Roles.TRAINER,
        title: "Session Completed",
        message: `A session with your member has been marked as completed.`,
        type: NotificationType.SESSION_COMPLETED,
        relatedId: sessionId,
        relatedModel: "Session",
        actionLink: "/trainer/sessions",
      },
    ]);
  }
}
