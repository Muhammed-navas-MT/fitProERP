import { Status } from "../../../../domain/enums/status";
import { EmailPayloadType } from "../../../../domain/type/emailPayload";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { ROUTES } from "../../../../presentation/shared/constants/routes";
import { NOtFoundException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IApproveGymEmailContentGenerator } from "../../../interfaces/service/IEmail/approveGymEmailContentGenerator";
import { IEmailService } from "../../../interfaces/service/IEmail/emailServiceInterface";
import { IApproveGymUseCase } from "../../../interfaces/useCase/superAdmin/gymMangement/approveGymUseCaseInterface";

export class ApproveGymUseCase implements IApproveGymUseCase {
  constructor(
    private _gymRepository: IGymAdminRepository,
    private _emailService: IEmailService,
    private _approveGymEmailContentGenerator: IApproveGymEmailContentGenerator
  ) {}

  async approve(id: string): Promise<void> {
    try {
      const gymAdmin = await this._gymRepository.findById(id);
      if (!gymAdmin) {
        throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
      }

      await this._gymRepository.update(
        {status: Status.IN_ACTIVE},
        id
      );
      const htmlContent = this._approveGymEmailContentGenerator.generateHtml({
        gymUrl: `http://${gymAdmin.subdomain}.localhost:5173/gym-admin${ROUTES.GYMADMIN.AUTH.LOGIN}`,
        gymName: gymAdmin.gymName,
        subdomain: gymAdmin.subdomain,
      });
      const payload: EmailPayloadType = {
        recieverMailId: gymAdmin.email,
        subject: "Gym Approved Successfully",
        content: htmlContent,
      };
      await this._emailService.sendEmail(payload);
    } catch (error) {
      throw error;
    }
  }
}
