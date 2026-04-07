import { GymAdminDashboardDto } from "../../../../dtos/gymAdminDto/dashboardDto";

export interface IGetDashboardUseCaseInterface {
  execute(gymAdminId: string): Promise<GymAdminDashboardDto>;
}
