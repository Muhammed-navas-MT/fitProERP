import { Status } from "../../../domain/enums/status";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { NOtFoundException } from "../../constants/exceptions";
import { IReApplyDTO } from "../../dtos/auth/gymAdminSignupDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ICloudinaryService } from "../../interfaces/service/cloudinaryServiceInterface";
import { IReApplyUseCase } from "../../interfaces/useCase/gymAdmin/reapplyAfterRejectionUseCaseInterface";

export class ReApplyUseCase implements IReApplyUseCase {
    private _gymAdminRepository:IGymAdminRepository;
    private _cloudinaryService:ICloudinaryService;

    constructor(gymAdminRepository:IGymAdminRepository,cloudinaryService:ICloudinaryService){
        this._gymAdminRepository = gymAdminRepository;
        this._cloudinaryService =cloudinaryService;
    }
    async execute(data:IReApplyDTO): Promise<void> {
        try {
            const findGymAdmin = await this._gymAdminRepository.findByEmail(data.email);
            if(!findGymAdmin){
                throw new NOtFoundException(GymAdminAuthError.EMAIL_ALREADY_EXISTS);
            };

            if (typeof data.businessLicense !== "string") {
                data.businessLicense = await this._cloudinaryService.uploadImageToCloudinary(data.businessLicense);
            }

            if (typeof data.insuranceCertificate !== "string") {
                data.insuranceCertificate = await this._cloudinaryService.uploadImageToCloudinary(data.insuranceCertificate);
            }

            await this._gymAdminRepository.update({
                businessLicense:data.businessLicense,
                insuranceCertificate:data.insuranceCertificate,
                status:Status.PENDING
            },
            findGymAdmin._id?.toString() as string
        )
        } catch (error) {
            throw error
        }
    };
}
