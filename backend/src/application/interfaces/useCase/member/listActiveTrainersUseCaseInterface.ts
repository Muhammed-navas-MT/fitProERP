import { IListActiveTrainersResponseDto } from "../../../dtos/auth/trainerDto";

export interface IListActiveTrainerUseCase {
  execute(memberId: string): Promise<IListActiveTrainersResponseDto[]>;
}
