import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { RegistrationExpiredException } from "../../constants/exceptions";
import { IRegistrationResponseDTO } from "../../dtos/auth/verifyOtpDto";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";
import { IResumeRegistrationUseCase } from "../../interfaces/useCase/gymAdmin/resumeRegistrationUseCaseInterface";

export class ResumeRegistrationUseCase implements IResumeRegistrationUseCase {
  constructor(private _cacheService: ICacheService) {}
  async execute(signupId: string): Promise<IRegistrationResponseDTO> {
    const cachedRegistration = await this._cacheService.getData(signupId);
    if (!cachedRegistration) {
      throw new RegistrationExpiredException(
        GymAdminAuthError.REGISTRATION_EXPIRED,
      );
    }
    const {
      ownerName,
      email,
      phone,
      isVerified,
      currentStep,
      description,
      gymName,
      tagline,
      logo,
    } = JSON.parse(cachedRegistration);
    return {
      ownerName,
      email,
      phone,
      isVerified,
      currentStep,
      description,
      gymName,
      logo,
      tagline,
    };
  }
}
