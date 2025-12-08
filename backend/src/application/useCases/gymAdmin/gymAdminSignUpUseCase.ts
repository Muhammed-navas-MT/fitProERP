import { ISingupUseCase } from "../../interfaces/useCase/gymAdmin/gymAdminSignUpUseCaseInterface";
import { ISignupRequsetDTO } from "../../dtos/auth/gymAdminSignupDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { AlreadyExistException } from "../../constants/exceptions";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { GymAdminMapper } from "../../mappers/gymAdminMapper";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { ICloudinaryService } from "../../interfaces/service/cloudinaryServiceInterface";

export class SignUpUseCase implements ISingupUseCase {
    private _gymAdminRepository:IGymAdminRepository;
    private _hashService:IHashService;
    private _cloudinaryService:ICloudinaryService;

    constructor(gymAdminRepository:IGymAdminRepository,hashService:IHashService,cloudinaryService:ICloudinaryService){
        this._gymAdminRepository = gymAdminRepository;
        this._hashService = hashService;
        this._cloudinaryService =cloudinaryService;
    }
    async signUp(data:ISignupRequsetDTO): Promise<void> {
        console.log(data,"from datad  dadfa")
        try {
            const findGymAdmin = await this._gymAdminRepository.findByEmail(data.email);
            if(findGymAdmin){
                throw new AlreadyExistException(GymAdminAuthError.EMAIL_ALREADY_EXISTS);
            };

            const hashPassword = await this._hashService.hash(data.password);
            data.password = hashPassword;

            if (typeof data.logo !== "string") {
                data.logo = await this._cloudinaryService.uploadImageToCloudinary(data.logo);
            }

            if (typeof data.businessLicense !== "string") {
                data.businessLicense = await this._cloudinaryService.uploadImageToCloudinary(data.businessLicense);
            }

            if (typeof data.insuranceCertificate !== "string") {
                data.insuranceCertificate = await this._cloudinaryService.uploadImageToCloudinary(data.insuranceCertificate);
            }

            console.log(data,"from signUp comdtroller");

            const gymAdminEntity = GymAdminMapper.toGymAdminEntity(data);
            await this._gymAdminRepository.create(gymAdminEntity);
        } catch (error) {
            throw error
        }
    };
}
