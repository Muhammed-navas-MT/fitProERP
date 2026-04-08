import { SuperAdminDashboardDto } from "../../../../dtos/superAdminDto/dashboardDto";

export interface IGetDashboardDetailUseCase {
  execute(superAdminId: string): Promise<SuperAdminDashboardDto>;
}
