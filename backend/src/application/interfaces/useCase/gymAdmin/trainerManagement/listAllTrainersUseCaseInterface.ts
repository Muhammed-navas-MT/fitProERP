import { IListTrainerRequestDTO, IListTrainerResponseDTO } from "../../../../dtos/gymAdminDto/listAllTrainersDto";

export interface IListAllTrainersUseCase{
    listAllTrainers(params:IListTrainerRequestDTO):Promise<IListTrainerResponseDTO|null>
}