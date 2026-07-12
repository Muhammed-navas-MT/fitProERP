import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import {
  AlreadyExistException,
  NOtFoundException,
} from "../../constants/exceptions";
import { IGymInfoRequestDTO } from "../../dtos/auth/verifyOtpDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";
import { ICloudinaryService } from "../../interfaces/service/cloudinaryServiceInterface";
import { IGymInformationUseCase } from "../../interfaces/useCase/gymAdmin/gymInformantionUseCaseInterface";

export class GymInformationUseCase implements IGymInformationUseCase {
  constructor(
    private _cacheService: ICacheService,
    private _gymAdminRepository: IGymAdminRepository,
    private _couldneryService: ICloudinaryService,
  ) {}
  async execute(data: IGymInfoRequestDTO): Promise<void> {
    const existingGymAdmin = await this._gymAdminRepository.findBySubdomian(
      data.subdomain,
    );
    console.log(data, "data....");

    if (existingGymAdmin) {
      throw new AlreadyExistException(
        GymAdminAuthError.GYM_NAME_ALREADY_EXISTS,
      );
    }
    const cachedRegistration = await this._cacheService.getData(data.signupId);

    if (!cachedRegistration) {
      throw new NOtFoundException(
        GymAdminAuthError.EMAIL_DATA_MISSING_IN_CACHE,
      );
    }
    let logo;

    if (data.logo) {
      logo = await this._couldneryService.uploadImageToCloudinary(
        data.logo,
        "gym_logos",
      );
    }

    const registrationData = JSON.parse(cachedRegistration);

    const newRegistrationData = {
      ...registrationData,
      description: data.description,
      gymName: data.gymName,
      logo: logo,
      subdomain: data.subdomain,
      tagline: data.tagline,
      currentStep: 2,
    };

    const ttl = await this._cacheService.getTTL(data.signupId);

    await this._cacheService.setData(
      data.signupId,
      JSON.stringify(newRegistrationData),
      ttl,
    );
  }
}
