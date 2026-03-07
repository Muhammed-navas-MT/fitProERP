import {
  IListExpenseRequestDto,
  IListExpenseResponseDto,
} from "../../../dtos/gymAdminDto/expenseDtos";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { IListAllExpenseUseCase } from "../../../interfaces/useCase/gymAdmin/expenseManagement/listAllExpensesUseCaseInterface";
import { mapExpenseListResponse } from "../../../mappers/gymAdmin/expenseMapper";

export class ListAllExpenseUseCase implements IListAllExpenseUseCase {
  constructor(private _expenseRepository: IGymAdminExpenseRepository) {}
  async execute(
    params: IListExpenseRequestDto,
  ): Promise<IListExpenseResponseDto> {
    const {
      expense,
      total,
      expenseSummary,
      thisMonthTotalExpense,
      grandTotal,
    } = await this._expenseRepository.findAllExpense(params);
    console.log(expense, total, expenseSummary);
    const response = mapExpenseListResponse(
      expense,
      params,
      total,
      expenseSummary,
      thisMonthTotalExpense,
      grandTotal,
    );
    return response;
  }
}
