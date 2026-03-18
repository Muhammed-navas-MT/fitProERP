import {
  ListAllSessionsRequestDto,
  ListAllSessionsResponseDto,
} from "../../../dtos/memberDto/slotAndBookingDto";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { IListAllSessionsUseCase } from "../../../interfaces/useCase/member/slotAndBookingManagement/listAllSessionsUseCaseInterface";
import { SessionMapper } from "../../../mappers/member/sessionMapper";

export class ListAllSessionsUseCase implements IListAllSessionsUseCase {
  constructor(private _sessionRepository: ISessionRepository) {}
  async execute(
    params: ListAllSessionsRequestDto,
  ): Promise<ListAllSessionsResponseDto> {
    const { sessions, total } =
      await this._sessionRepository.listAllSessionByMemberId(params);
    const response = SessionMapper.toListSessionResponse(
      params,
      sessions,
      total,
    );
    return response;
  }
}
