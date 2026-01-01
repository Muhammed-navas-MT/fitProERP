import { Status } from "../../../domain/enums/status";
import {
  ForbiddenException,
  NOtFoundException,
} from "../../constants/exceptions";
import {
  LoginRequestDTO,
  TrainerLoginResponseDTO,
} from "../../dtos/auth/loginDto";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { LoginMapper } from "../../mappers/loginMapper";
import { ITrainerLoginUseCase } from "../../interfaces/useCase/trainer/trainerLoginUseCaseInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";

export class TrainerLoginUseCase implements ITrainerLoginUseCase {
  private _trainerRepository: ITrainerRepository;
  private _hashService: IHashService;
  private _gymAdminRepository: IGymAdminRepository;

  constructor(
    trainerRepository: ITrainerRepository,
    hashService: IHashService,
    gymAdminRepository: IGymAdminRepository,
  ) {
    this._trainerRepository = trainerRepository;
    this._hashService = hashService;
    this._gymAdminRepository = gymAdminRepository;
  }

  async login(data: LoginRequestDTO): Promise<TrainerLoginResponseDTO> {
    try {
      const trainer = await this._trainerRepository.findByEmail(data.email);
      if (!trainer) {
        throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
      }

      const gym = await this._gymAdminRepository.findById(trainer.gymId);
      if (!gym) {
    throw new NOtFoundException(TrainerError.GYM_NOT_FOUND);
    }

      const isPassswordValid = this._hashService.compare(
        data.password,
        trainer.password
      );
      if (!isPassswordValid) {
        throw new ForbiddenException(TrainerError.INVALID_CREDENTIALS);
      }
      if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(TrainerError.GYM_NOT_ACTIVE);
      }

      if (trainer.status === Status.PENDING) {
        throw new ForbiddenException(TrainerError.TRAINER_IS_PENDING);
      } else if (trainer.status === Status.ACTIVE) {
        const response = LoginMapper.trainerLoginMapper({trainer,subdomain:gym.subdomain});
        return response;
      } else {
        throw new ForbiddenException(TrainerError.STATUS_INVALID);
      }
    } catch (error) {
      throw error;
    }
  }
}
