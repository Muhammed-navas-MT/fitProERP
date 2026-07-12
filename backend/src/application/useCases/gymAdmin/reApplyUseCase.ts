import { Status } from "../../../domain/enums/status";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { NOtFoundException } from "../../constants/exceptions";
import { IReApplyDTO } from "../../dtos/auth/gymAdminSignupDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ICloudinaryService } from "../../interfaces/service/cloudinaryServiceInterface";
import { IReApplyUseCase } from "../../interfaces/useCase/gymAdmin/reapplyAfterRejectionUseCaseInterface";

export class ReApplyUseCase implements IReApplyUseCase {
  private _gymAdminRepository: IGymAdminRepository;
  private _cloudinaryService: ICloudinaryService;

  constructor(
    gymAdminRepository: IGymAdminRepository,
    cloudinaryService: ICloudinaryService,
  ) {
    this._gymAdminRepository = gymAdminRepository;
    this._cloudinaryService = cloudinaryService;
  }
  async execute(data: IReApplyDTO): Promise<void> {
    const findGymAdmin = await this._gymAdminRepository.findByEmail(data.email);
    if (!findGymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.EMAIL_ALREADY_EXISTS);
    }

    let businessLicense;
    let insuranceCertificate;

    if (data.businessLicense) {
      businessLicense = await this._cloudinaryService.uploadImageToCloudinary(
        data.businessLicense,
        "gym_documents",
      );
    }

    if (data.insuranceCertificate) {
      insuranceCertificate =
        await this._cloudinaryService.uploadImageToCloudinary(
          data.insuranceCertificate,
          "gym_documents",
        );
    }

    await this._gymAdminRepository.update(
      {
        businessLicense,
        insuranceCertificate,
        status: Status.PENDING,
      },
      findGymAdmin._id?.toString() as string,
    );
  }
}
