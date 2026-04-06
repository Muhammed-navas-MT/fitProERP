import { DashboardSummaryDto } from "../../../../dtos/trainerDto/dashboardDto";

export interface IGetDetailUseCase {
  execute(trainerId: string): Promise<DashboardSummaryDto>;
}
