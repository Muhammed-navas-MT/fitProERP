import { Status } from "../../../../domain/enums/status";
import { EmailPayloadType } from "../../../../domain/type/emailPayload";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { NOtFoundException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IEmailService } from "../../../interfaces/service/IEmail/emailServiceInterface";
import { IRejectGymEmailContentGenerator } from "../../../interfaces/service/IEmail/rejectGymEmailContentGenerator";
import { IRejectGymUseCase } from "../../../interfaces/useCase/superAdmin/gymMangement/rejectGymUseCaseInterface";

export class RejectGymUseCase implements IRejectGymUseCase {
  constructor(
    private _gymRepository: IGymAdminRepository,
    private _emailService: IEmailService,
    private _rejectGymEmailContentGenerator: IRejectGymEmailContentGenerator
  ) {}
  async reject(id: string,reason:string): Promise<void> {
    try {
      const gymAdmin = await this._gymRepository.findById(id);
      if (!gymAdmin) {
        throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
      }
      await this._gymRepository.update(
        { status: Status.BLOCKED },
        id
      );
      const htmlContent = this._rejectGymEmailContentGenerator.generateHtml({
        reason,
        gymName: gymAdmin.gymName,
        supportEmail: "support.fitpro@gmail.com",
      });
      const payload: EmailPayloadType = {
        recieverMailId: gymAdmin.email,
        subject: "Gym Application Rejected",
        content: htmlContent,
      };
      await this._emailService.sendEmail(payload);
    } catch (error) {
      throw error;
    }
  }
}
