import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { DashboardSummaryDto } from "../../../dtos/trainerDto/dashboardDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { IGetDetailUseCase } from "../../../interfaces/useCase/trainer/dashboardManagement/getDetailsUseCaseInterface";
import { DashboardMapper } from "../../../mappers/trainer/dashboardMapper";

export class GetDetailsUseCase implements IGetDetailUseCase {
  constructor(
    private _sessionRepository: ISessionRepository,
    private _memberRepository: IMemberRepository,
    private _trainerSalaryRepository: ITrainerSalaryRepository,
  ) {}
  async execute(trainerId: string): Promise<DashboardSummaryDto> {
    const today = new Date();
    const formatteDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    console.log(formatteDate);

    const sessions = await this._sessionRepository.listTodaySessionsByTrainerId(
      trainerId,
      formatteDate,
    );
    const todayCompletedSessionCount = sessions.reduce((acc, val) => {
      if (val.status === SessionStatus.COMPLETED) return acc + 1;
      return acc;
    }, 0);
    const { total, active } =
      await this._memberRepository.countTotalAndActiveByTrainerId(trainerId);

    const salary =
      await this._trainerSalaryRepository.findLastMonthSalaryByTrainerId(
        trainerId,
      );

    let lastMonthSalary = 0;
    if (salary) {
      lastMonthSalary = salary.netSalary;
    }

    const response = DashboardMapper.toDashBoardSummary(
      sessions,
      todayCompletedSessionCount,
      active,
      total,
      lastMonthSalary,
    );
    return response;
  }
}
