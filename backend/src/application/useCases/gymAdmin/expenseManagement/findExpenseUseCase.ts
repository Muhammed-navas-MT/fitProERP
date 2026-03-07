import { ExpenseError } from "../../../../presentation/shared/constants/messages/expensemessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { IExpenseResponseDto } from "../../../dtos/gymAdminDto/expenseDtos";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { IFindExpeUseCase } from "../../../interfaces/useCase/gymAdmin/expenseManagement/findExpenseUseCaseInterface";
import { mapExpenseToResponse } from "../../../mappers/gymAdmin/expenseMapper";

export class FindExpenseUseCase implements IFindExpeUseCase {
  constructor(private _expenseRepository: IGymAdminExpenseRepository) {}

  async execute(id: string): Promise<IExpenseResponseDto> {
    const findExpense = await this._expenseRepository.findById(id);

    if (!findExpense) {
      throw new NOtFoundException(ExpenseError.NOT_FOUND);
    }

    const response = mapExpenseToResponse(findExpense);

    return response;
  }
}
