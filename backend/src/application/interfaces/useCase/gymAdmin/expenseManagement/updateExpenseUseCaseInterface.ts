import { IUpdateExpenseRequestDto } from "../../../../dtos/gymAdminDto/expenseDtos";

export interface IUpdateExpenseUseCase {
  execute(expense: IUpdateExpenseRequestDto, expesneId: string): Promise<void>;
}
