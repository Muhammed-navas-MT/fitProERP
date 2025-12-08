import { AlreadyExistException } from "../../constants/exceptions";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { ISingupTrainerUseCase } from "../../interfaces/useCase/trainer/signUpUseCaseInterface";
import { ITrainerSignUpRequestDTO } from "../../dtos/auth/trainerDto";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";

export class SingupTrainerUseCase implements ISingupTrainerUseCase {
    private _trainerRepository:ITrainerRepository;
    private _hashService:IHashService;

    constructor(trainerRepository:ITrainerRepository,hashService:IHashService){
        this._trainerRepository = trainerRepository;
        this._hashService = hashService
    }
    async signUp(data: ITrainerSignUpRequestDTO): Promise<void> {
        try {
            const findTrainer = await this._trainerRepository.findByEmail(data.email);
            if(findTrainer){
                throw new AlreadyExistException(TrainerError.EMAIL_ALREADY_EXISTS)
            };
            const hashPassword = await this._hashService.hash(data.password);
            data.password = hashPassword;
            await this._trainerRepository.create(data);
        } catch (error) {
            throw error
        }
    };
}
