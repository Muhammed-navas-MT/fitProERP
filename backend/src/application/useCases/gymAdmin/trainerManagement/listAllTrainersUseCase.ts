import { Status } from "../../../../domain/enums/status";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { ForbiddenException, NOtFoundException } from "../../../constants/exceptions";
import { IListTrainerRequestDTO, IListTrainerResponseDTO } from "../../../dtos/gymAdminDto/listAllTrainersDto";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListAllTrainersUseCase } from "../../../interfaces/useCase/gymAdmin/trainerManagement/listAllTrainersUseCaseInterface";
import { TrainerMapper } from "../../../mappers/trainerMapper";

export class listAllTrainersUseCase implements IListAllTrainersUseCase {
  private _trainerRepository: ITrainerRepository;
  private _gymAdminRepository: IGymAdminRepository;

  constructor(
    trainerRepository: ITrainerRepository,
    gymAdminRepository: IGymAdminRepository,
  ) {
    this._trainerRepository = trainerRepository;
    this._gymAdminRepository = gymAdminRepository;
  }
  async listAllTrainers(params: IListTrainerRequestDTO): Promise<IListTrainerResponseDTO | null> {
    console.log(params,"navasss....navas.....")
    const findGym = await this._gymAdminRepository.findById(params.gymId);
    if(!findGym){
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    };
    if(findGym.status !== Status.ACTIVE){
      throw new ForbiddenException(GymAdminAuthError.GYM_NOT_ACTIVE)
    };

    let {trainers,total} = await this._trainerRepository.listAllTrainers(params);
    
    const response:IListTrainerResponseDTO = TrainerMapper.toListTrainersResponse(trainers,total,params);
    return response;
  }
}
