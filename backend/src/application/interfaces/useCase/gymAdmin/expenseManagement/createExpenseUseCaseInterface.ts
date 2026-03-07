import { ICreateExpenseRequestDto } from "../../../../dtos/gymAdminDto/expenseDtos";

export interface ICreateExpenseUseCase {
  execute(expense: ICreateExpenseRequestDto, gymId: string): Promise<void>;
}
