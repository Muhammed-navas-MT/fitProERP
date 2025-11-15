import { ISingupUseCase } from "../../interfaces/useCase/gymAdmin/gymAdminSignUpUseCaseInterface";
import { ISignupRequsetDTO } from "../../dtos/auth/gymAdminSignupDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { AlreadyExistException } from "../../constants/exceptions";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { GymAdminMapper } from "../../mappers/gymAdminMapper";
import { IHashService } from "../../interfaces/service/hashServiceInterface";

export class SignUpUseCase implements ISingupUseCase {
    private _gymAdminRepository:IGymAdminRepository;
    private _hashService:IHashService;

    constructor(gymAdminRepository:IGymAdminRepository,hashService:IHashService){
        this._gymAdminRepository = gymAdminRepository;
        this._hashService = hashService
    }
    async signUp(data: ISignupRequsetDTO): Promise<void> {
        try {
            const findGymAdmin = await this._gymAdminRepository.findByEmail(data.email);
            if(findGymAdmin){
                throw new AlreadyExistException(GymAdminAuthError.EMAIL_ALREADY_EXISTS)
            };
            const hashPassword = await this._hashService.hash(data.password);
            data.password = hashPassword;
            const gymAdminEntity = GymAdminMapper.toGymAdminEntity(data);
            await this._gymAdminRepository.create(gymAdminEntity);
        } catch (error) {
            throw error
        }
    };
}
