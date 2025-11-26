import { Status } from "../../../domain/enums/status";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import { LoginRequestDTO, TrainerLoginResponseDTO } from "../../dtos/auth/loginDto";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { LoginMapper } from "../../mappers/loginMapper";
import { ITrainerLoginUseCase } from "../../interfaces/useCase/trainer/trainerLoginUseCaseInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";

export class TrainerLoginUseCase implements ITrainerLoginUseCase {
    private _trainerRepository:ITrainerRepository;
    private _hashService:IHashService;
    constructor(
        trainerRepository:ITrainerRepository,
        hashService:IHashService,
    ){
        this._trainerRepository = trainerRepository;
        this._hashService = hashService;
    };

    async login(data: LoginRequestDTO): Promise<TrainerLoginResponseDTO> {
        try {
            const trainer = await this._trainerRepository.findByEmail(data.email);
            if(!trainer){
                throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
            };

            const isPassswordValid = this._hashService.compare(data.password,trainer.password);
            if(!isPassswordValid){
                throw new NOtFoundException(TrainerError.GYM_NOT_FOUND);
            };

            if(trainer.status === Status.PENDING){
                throw new ForbiddenException(TrainerError.TRAINER_IS_PENDING);

            }else if(trainer.status === Status.ACTIVE){
                const response = LoginMapper.trainerLoginMapper(trainer);
                return response;
            }else{
                throw new ForbiddenException(TrainerError.STATUS_INVALID_TYPE);
            }
        } catch (error) {
            throw error
        }
    }
}