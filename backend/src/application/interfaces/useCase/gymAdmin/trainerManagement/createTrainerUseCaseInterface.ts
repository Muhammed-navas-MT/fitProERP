import { ITrainerCreateRequestDTO } from "../../../../dtos/auth/trainerDto";

export interface ICreateTrainerUseCase{
    create(data:ITrainerCreateRequestDTO):Promise<void>;
}