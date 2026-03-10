import { IGymAdminExpenseEntity } from "../../../../domain/entities/gymAdmin/expensessEntity";
import {
  IPopulatedExpense,
  MonthlyExpenseSummary,
} from "../../../../infrastructure/repository/databaseConfigs/types/populatedExpenseTypes";
import { IListExpenseRequestDto } from "../../../dtos/gymAdminDto/expenseDtos";
import { IBaseRepository } from "../base/baseRepo";

export interface IGymAdminExpenseRepository extends IBaseRepository<IGymAdminExpenseEntity> {
  findAllExpense(params: IListExpenseRequestDto): Promise<{
    expense: IPopulatedExpense[];
    total: number;
    expenseSummary: MonthlyExpenseSummary[];
    thisMonthTotalExpense: number;
    grandTotal: number;
  }>;
  findExpenseDetailById(id: string): Promise<IPopulatedExpense | null>;
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

  totalExpenseByMonth(
    gymId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number>;
}
