import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { SessionError } from "../../../../presentation/shared/constants/messages/sessionMessages";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { IMarkAsCompletedUseCase } from "../../../interfaces/useCase/trainer/sessionManagement/markAsComplitedUseCaseInterface";

export class MarkAsCompletedUseCase implements IMarkAsCompletedUseCase {
  constructor(private _sessionRepository: ISessionRepository) {}
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
  }
}
