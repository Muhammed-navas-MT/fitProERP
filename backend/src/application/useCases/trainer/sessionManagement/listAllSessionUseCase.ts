import {
  ListSessionRequestDto,
  ListSessionResponseDto,
} from "../../../dtos/trainerDto/sessionDto";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { IListTrainerSessionUseCase } from "../../../interfaces/useCase/trainer/sessionManagement/listAllSessionsUseCaseInterface";
import { TrainerSessionMapper } from "../../../mappers/trainer/sessionMapper";

export class ListTrainerSessionUseCase implements IListTrainerSessionUseCase {
  constructor(private _sessionRepository: ISessionRepository) {}
  async execute(
    params: ListSessionRequestDto,
  ): Promise<ListSessionResponseDto> {
    const { sessions, total } =
      await this._sessionRepository.listAllSessionByTrainerId(params);

    const response = TrainerSessionMapper.toListSessionResponse(
      params,
      sessions,
      total,
    );

    return response;
  }
}
