import { GymAdminEntity } from "../../../../domain/entities/gymAdmin/gymAdminEntity";
import { InvalidDataException } from "../../../constants/exceptions";
import { IListGymsRequestDTO, IListGymsResponseDTO } from "../../../dtos/gymAdminDto/gymManagementDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListGymsUseCase } from "../../../interfaces/useCase/superAdmin/gymMangement/listGymsUseCaseInterFace";
import { GymAdminMapper } from "../../../mappers/gymAdminMapper";

export class ListGymUseCase implements IListGymsUseCase {
  constructor(
    private gymAdminRepository: IGymAdminRepository,
    private trainerRepository: ITrainerRepository
  ) {}

  async listAllGym(
    params: IListGymsRequestDTO
  ): Promise<IListGymsResponseDTO> {
    try {
      const { gyms, total } = await this.gymAdminRepository.listGyms(params);

      const gymsWithTrainerCount = await Promise.all(
        gyms.map(async (gym) => {
            if(!gym._id){
                throw new InvalidDataException("Gym ID is missing")
            }
          const trainerCount = await this.trainerRepository.countTrainersByGymId(gym._id.toString());
          return GymAdminMapper.toListGymsResponse(gym,trainerCount)
        })
      );
      const page = params.page ?? 1;
      const limit = params.limit ?? 10;

      return {
        gyms: gymsWithTrainerCount,
        totalGyms: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }
}
