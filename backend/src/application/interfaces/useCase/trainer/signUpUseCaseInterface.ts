import { ITrainerSignUpRequestDTO } from "../../../dtos/auth/trainerDto";
import { IListTrainerRequestDTO, IListTrainerResponseDTO } from "../../../dtos/trainerDto/listAllTrainerDto";

export interface ISingupTrainerUseCase{
    signUp(data:ITrainerSignUpRequestDTO):Promise<void>;
    listAllTrainers(params:IListTrainerRequestDTO):Promise<IListTrainerResponseDTO|null>
}