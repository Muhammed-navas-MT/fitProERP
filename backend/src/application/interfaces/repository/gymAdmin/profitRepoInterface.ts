import { IGymAdminProfitEntity } from "../../../../domain/entities/gymAdmin/profitEntiry";
import {
  GymProfitAnalyticsDTO,
  IFindProfitRequestDto,
} from "../../../dtos/gymAdminDto/profitDto";
import { IBaseRepository } from "../base/baseRepo";

export interface IProfitRepository extends IBaseRepository<IGymAdminProfitEntity> {
  findProfitByPeriod(
    params: IFindProfitRequestDto,
  ): Promise<IGymAdminProfitEntity | null>;

  getProfitAnalytics(
    gymId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GymProfitAnalyticsDTO>;
}
