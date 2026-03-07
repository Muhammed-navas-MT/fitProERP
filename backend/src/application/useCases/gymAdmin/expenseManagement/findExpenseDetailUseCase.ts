import { ExpenseError } from "../../../../presentation/shared/constants/messages/expensemessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { IExpenseDetailResponseDto } from "../../../dtos/gymAdminDto/expenseDtos";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { IFindExpenseDetailUseCase } from "../../../interfaces/useCase/gymAdmin/expenseManagement/findExpenseDetailUseCaseInterface";
import { mapExpenseToDetailResponse } from "../../../mappers/gymAdmin/expenseMapper";

export class FindExpenseDetailUseCase implements IFindExpenseDetailUseCase {
  constructor(private _expenseRepository: IGymAdminExpenseRepository) {}

  async execute(id: string): Promise<IExpenseDetailResponseDto> {
    const findExpense = await this._expenseRepository.findExpenseDetailById(id);

    if (!findExpense) {
      throw new NOtFoundException(ExpenseError.NOT_FOUND);
    }

    const response = mapExpenseToDetailResponse(findExpense);

    return response;
  }
}
