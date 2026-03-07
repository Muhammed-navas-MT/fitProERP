import { ExpenseError } from "../../../../presentation/shared/constants/messages/expensemessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { IUpdateExpenseRequestDto } from "../../../dtos/gymAdminDto/expenseDtos";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { IUpdateExpenseUseCase } from "../../../interfaces/useCase/gymAdmin/expenseManagement/updateExpenseUseCaseInterface";

export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
  constructor(private _expenseRepository: IGymAdminExpenseRepository) {}

  async execute(
    expense: IUpdateExpenseRequestDto,
    expenseId: string,
  ): Promise<void> {
    const findExpense = await this._expenseRepository.findById(expenseId);
    if (!findExpense) {
      throw new NOtFoundException(ExpenseError.NOT_FOUND);
    }
    await this._expenseRepository.update(expense, expenseId);
  }
}
