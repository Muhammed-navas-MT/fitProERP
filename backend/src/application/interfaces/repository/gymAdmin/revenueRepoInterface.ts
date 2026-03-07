import { IGymAdminRevenueEntity } from "../../../../domain/entities/gymAdmin/revenueEntity";
import {
  IPopulatedRevenue,
  SummaryType,
} from "../../../../infrastructure/repository/databaseConfigs/types/populatedRevenueType";
import { IListRevenueRequestDTO } from "../../../dtos/gymAdminDto/revenueDto";
import { IBaseRepository } from "../base/baseRepo";

export interface IGymAdminRevenueRepository extends IBaseRepository<IGymAdminRevenueEntity> {
  existsBySessionId(sessionId: string): Promise<boolean>;
  findAllRevenues(params: IListRevenueRequestDTO): Promise<{
    revenues: IPopulatedRevenue[];
    total: number;
    summary: SummaryType[];
    grandTotalAmount: number;
  }>;
  findRevenueDetailById(id: string): Promise<IPopulatedRevenue | null>;
}
