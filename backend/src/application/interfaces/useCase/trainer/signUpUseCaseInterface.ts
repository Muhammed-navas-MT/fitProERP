import { ITrainerSignUpRequestDTO } from "../../../dtos/auth/trainerDto";

export interface ISingupTrainerUseCase{
    signUp(data:ITrainerSignUpRequestDTO):Promise<void>;
}