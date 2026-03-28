import { ProgressError } from "../../../../presentation/shared/constants/messages/progressMassages";
import { NOtFoundException } from "../../../constants/exceptions";
import { IFindProgressDto } from "../../../dtos/memberDto/progressDto";
import { IProgressRepository } from "../../../interfaces/repository/member/progressRepoInterface";
import { IFindProgressUseCase } from "../../../interfaces/useCase/member/progressManagement/findProgressDetailsUseCaseInterface";
import { ProgressMapper } from "../../../mappers/member/progressMapper";

export class FindProgressUseCase implements IFindProgressUseCase {
  constructor(private _progressRepository: IProgressRepository) {}
  async execute(progressId: string): Promise<IFindProgressDto> {
    const progress = await this._progressRepository.findById(progressId);
    if (!progress) {
      throw new NOtFoundException(ProgressError.NOT_FOUND);
    }
    return ProgressMapper.toFindProgressDto(progress);
  }
}
