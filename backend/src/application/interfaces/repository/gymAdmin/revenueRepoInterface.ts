import { IGymAdminRevenueEntity } from "../../../../domain/entities/gymAdmin/revenueEntity";
import {
  IPopulatedPayment,
  IPopulatedRevenue,
  SummaryType,
} from "../../../../infrastructure/repository/databaseConfigs/types/populatedRevenueType";
import { IListRevenueRequestDTO } from "../../../dtos/gymAdminDto/revenueDto";
import { IListPaymentsRequestDto } from "../../../dtos/memberDto/purchasePackageDto";
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
  findAllPaymentsByMemberId(params: IListPaymentsRequestDto): Promise<{
    payments: IPopulatedPayment[];
    total: number;
    grandTotalAmount: number;
    summary: SummaryType[];
  }>;
  calculateTotalByDate(
    gymId: string,
    branchId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number>;

  countByDate(
    gymId: string,
    branchId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number>;
}
