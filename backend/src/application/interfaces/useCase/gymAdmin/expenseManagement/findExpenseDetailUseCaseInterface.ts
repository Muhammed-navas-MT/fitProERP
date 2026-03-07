import { IExpenseDetailResponseDto } from "../../../../dtos/gymAdminDto/expenseDtos";

export interface IFindExpenseDetailUseCase {
  execute(id: string): Promise<IExpenseDetailResponseDto>;
}
