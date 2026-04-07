import { DashboardDto } from "../../../../dtos/memberDto/dashboardDto";

export interface IGetDashboardDetailUseCase {
  execute(memberId: string): Promise<DashboardDto>;
}
