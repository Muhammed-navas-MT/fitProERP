import {
  IListProgressRequestDto,
  IListProgressResponseDto,
} from "../../../dtos/memberDto/progressDto";
import { IProgressRepository } from "../../../interfaces/repository/member/progressRepoInterface";
import { IListAllProgressUseCase } from "../../../interfaces/useCase/member/progressManagement/listAllProgressUseCaseInterface";
import { ProgressMapper } from "../../../mappers/member/progressMapper";

export class ListAllProgressUseCase implements IListAllProgressUseCase {
  constructor(private _progressRepository: IProgressRepository) {}

  async execute(
    params: IListProgressRequestDto,
  ): Promise<IListProgressResponseDto> {
    const { progress, total } =
      await this._progressRepository.listAllProgress(params);

    return ProgressMapper.toListProgressResponse(params, progress, total);
  }
}
