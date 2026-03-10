import { GymProfitAnalyticsDTO } from "../../../../dtos/gymAdminDto/profitDto";

export interface IGetProfitAnalyticsUseCase {
  execute(
    gymId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GymProfitAnalyticsDTO>;
}
