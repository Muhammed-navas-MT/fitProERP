import { IMonthlyProgressReport } from "../../../dtos/memberDto/progressDto";
import { IProgressRepository } from "../../../interfaces/repository/member/progressRepoInterface";
import { IFindProgressGraphDataUseCase } from "../../../interfaces/useCase/member/progressManagement/findProgressGraphDataUseCaseInterface";
import { ProgressMapper } from "../../../mappers/member/progressMapper";

export class FindProgressGraphDataUseCase implements IFindProgressGraphDataUseCase {
  constructor(private _progressRepository: IProgressRepository) {}
  async execute(memberId: string): Promise<IMonthlyProgressReport[]> {
    const progress =
      await this._progressRepository.findProgressByMemberId(memberId);
    const response = ProgressMapper.toGraphData(progress);
    return response;
  }
}
