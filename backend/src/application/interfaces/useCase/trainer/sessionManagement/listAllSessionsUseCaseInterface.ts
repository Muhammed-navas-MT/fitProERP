import {
  ListSessionRequestDto,
  ListSessionResponseDto,
} from "../../../../dtos/trainerDto/sessionDto";

export interface IListTrainerSessionUseCase {
  execute(params: ListSessionRequestDto): Promise<ListSessionResponseDto>;
}
