import { ICreateExpenseRequestDto } from "../../../dtos/gymAdminDto/expenseDtos";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { ICreateExpenseUseCase } from "../../../interfaces/useCase/gymAdmin/expenseManagement/createExpenseUseCaseInterface";
import { mapCreateExpenseDtoToEntity } from "../../../mappers/gymAdmin/expenseMapper";

export class CreateExpenseUseCase implements ICreateExpenseUseCase {
  constructor(private _expenseRepository: IGymAdminExpenseRepository) {}

  async execute(
    expense: ICreateExpenseRequestDto,
    gymId: string,
  ): Promise<void> {
    const expenseEntity = mapCreateExpenseDtoToEntity(expense, gymId);
    await this._expenseRepository.create(expenseEntity);
  }
}
