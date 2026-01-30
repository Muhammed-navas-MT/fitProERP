import { Status } from "../../../domain/enums/status";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import { GymAdminLoginResponseDTO, GymAdminLoginRequestDTO } from "../../dtos/auth/loginDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { IGymAdminLoginUseCase } from "../../interfaces/useCase/gymAdmin/gymAdminLoginUseCaseInterface";
import { LoginMapper } from "../../mappers/loginMapper";

export class GymAdminLoginUseCase implements IGymAdminLoginUseCase {
    private _gymAdminRepository:IGymAdminRepository;
    private _hashService:IHashService;
    constructor(
        gymAdminRepository:IGymAdminRepository,
        hashService:IHashService,
    ){
        this._gymAdminRepository = gymAdminRepository;
        this._hashService = hashService;
    };

    async login(data: GymAdminLoginRequestDTO): Promise<GymAdminLoginResponseDTO> {
        try {
            const findGym = await this._gymAdminRepository.findBySubdomian(data.subdomain);
            if(!findGym){
                throw new NOtFoundException("Enter valid subdomain....")
            }
            const gymAdmin = await this._gymAdminRepository.findByEmail(data.email);
            if(!gymAdmin){
                throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
            };

            const isPassswordValid = await this._hashService.compare(data.password,gymAdmin.password);
            if(!isPassswordValid){
                throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
            };

            if(gymAdmin.status === Status.PENDING){
                throw new ForbiddenException(GymAdminAuthError.GYM_IS_PENDING);

            }else{
                const response = LoginMapper.gymAdminloginMapper(gymAdmin);
                return response;
            }
        } catch (error) {
            throw error
        }
    }
}