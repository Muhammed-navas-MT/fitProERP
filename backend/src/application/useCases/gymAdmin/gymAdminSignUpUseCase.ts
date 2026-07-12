import { ISingupUseCase } from "../../interfaces/useCase/gymAdmin/gymAdminSignUpUseCaseInterface";
import { IDocumentRequsetDTO } from "../../dtos/auth/gymAdminSignupDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import {
  AlreadyExistException,
  BadRequestException,
  NOtFoundException,
} from "../../constants/exceptions";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { GymAdminMapper } from "../../mappers/gymAdminMapper";
import { ICloudinaryService } from "../../interfaces/service/cloudinaryServiceInterface";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";

export class SignUpUseCase implements ISingupUseCase {
  private _gymAdminRepository: IGymAdminRepository;
  private _cacheService: ICacheService;
  private _cloudinaryService: ICloudinaryService;

  constructor(
    gymAdminRepository: IGymAdminRepository,
    cacheService: ICacheService,
    cloudinaryService: ICloudinaryService,
  ) {
    this._gymAdminRepository = gymAdminRepository;
    this._cacheService = cacheService;
    this._cloudinaryService = cloudinaryService;
  }
  async signUp(data: IDocumentRequsetDTO): Promise<void> {
    const cachedRegistration = await this._cacheService.getData(data.signupId);
    if (!cachedRegistration) {
      throw new NOtFoundException(GymAdminAuthError.REGISTRATION_EXPIRED);
    }
    const registrationData = JSON.parse(cachedRegistration);

    const existGymBySubdomain = await this._gymAdminRepository.findBySubdomian(
      registrationData.subdomain,
    );

    if (existGymBySubdomain) {
      throw new AlreadyExistException(
        GymAdminAuthError.GYM_NAME_ALREADY_EXISTS,
      );
    }

    if (!registrationData.isVerified) {
      throw new BadRequestException(GymAdminAuthError.EMAIL_NOT_VERIFIED);
    }

    let licenseUrl;
    let insuranceUrl;

    if (data.businessLicense) {
      licenseUrl = await this._cloudinaryService.uploadImageToCloudinary(
        data.businessLicense,
        "gym_documents",
      );
    }

    if (data.insuranceCertificate) {
      insuranceUrl = await this._cloudinaryService.uploadImageToCloudinary(
        data.insuranceCertificate,
        "gym_documents",
      );
    }

    const gymAdminEntity = GymAdminMapper.toGymAdminEntity({
      ...data,
      businessLicense: licenseUrl,
      insuranceCertificate: insuranceUrl,
      ...registrationData,
    });
    await this._gymAdminRepository.create(gymAdminEntity);
    await this._cacheService.deleteData(data.signupId);
    await this._cacheService.deleteData(registrationData.email);
  }
}
