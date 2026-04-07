import {
  IListProgressRequestDto,
  IListProgressResponseDto,
} from "../../../dtos/memberDto/progressDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IProgressRepository } from "../../../interfaces/repository/member/progressRepoInterface";
import { IListAllProgressUseCase } from "../../../interfaces/useCase/member/progressManagement/listAllProgressUseCaseInterface";
import { ProgressMapper } from "../../../mappers/member/progressMapper";

export class ListAllProgressUseCase implements IListAllProgressUseCase {
  constructor(
    private _progressRepository: IProgressRepository,
    private _memberRepository: IMemberRepository,
  ) {}

  async execute(
    params: IListProgressRequestDto,
  ): Promise<IListProgressResponseDto> {
    const { progress, total } =
      await this._progressRepository.listAllProgress(params);

    const allProgress = await this._progressRepository.findProgressByMemberId(
      params.memberId,
    );

    const member = await this._memberRepository.findById(params.memberId);

    if (!member) {
      throw new Error("Member not found");
    }

    const latestProgress = ProgressMapper.toLatestProgressSummary(allProgress);

    const monthlyStatus = ProgressMapper.toMonthlyStatus(allProgress);

    const goalWeightStatus = ProgressMapper.toGoalWeightStatus(
      allProgress,
      member.healthDetails?.targetWeight,
    );

    return ProgressMapper.toListProgressResponse(
      params,
      progress,
      total,
      latestProgress,
      monthlyStatus,
      goalWeightStatus,
    );
  }
}
