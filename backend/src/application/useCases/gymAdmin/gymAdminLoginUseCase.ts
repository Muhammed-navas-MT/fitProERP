import { Status } from "../../../domain/enums/status";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import { LoginRequestDTO, GymAdminLoginResponseDTO } from "../../dtos/auth/loginDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISubscripctionRespoditery } from "../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { IGymAdminLoginUseCase } from "../../interfaces/useCase/gymAdmin/gymAdminLoginUseCaseInterface";
import { LoginMapper } from "../../mappers/loginMapper";

export class GymAdminLoginUseCase implements IGymAdminLoginUseCase {
    private _gymAdminRepository:IGymAdminRepository;
    private _hashService:IHashService;
    private _subscriptionRepository:ISubscripctionRespoditery
    constructor(
        gymAdminRepository:IGymAdminRepository,
        hashService:IHashService,
        subscriptionRepository:ISubscripctionRespoditery
    ){
        this._gymAdminRepository = gymAdminRepository;
        this._hashService = hashService;
        this._subscriptionRepository = subscriptionRepository
    };

    async login(data: LoginRequestDTO): Promise<GymAdminLoginResponseDTO> {
        try {
            const gymAdmin = await this._gymAdminRepository.findByEmail(data.email);
            if(!gymAdmin){
                throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
            };

            const isPassswordValid = this._hashService.compare(data.password,gymAdmin.password);
            if(!isPassswordValid){
                throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
            };

            if(gymAdmin.status === Status.PENDING){
                throw new ForbiddenException(GymAdminAuthError.GYM_IS_PENDING);

            }else if(gymAdmin.status === Status.IN_ACTIVE){
                const subscriptions = await this._subscriptionRepository.getAllSubscriptions() || [];
                const response = LoginMapper.gymAdminloginMapper(gymAdmin,subscriptions);
                return response;
            }else if (gymAdmin.status === Status.REGECTED){
                throw new ForbiddenException(GymAdminAuthError.GYM_IS_REGECTED)
            }else if(gymAdmin.status == Status.ACTIVE){
                const response = LoginMapper.gymAdminloginMapper(gymAdmin);
                return response;
            }else{
                throw new ForbiddenException(GymAdminAuthError.GYM_STATUS_INVALID)
            }
        } catch (error) {
            throw error
        }
    }
}