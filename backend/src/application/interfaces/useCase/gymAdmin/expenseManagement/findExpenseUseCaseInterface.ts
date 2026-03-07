import { IExpenseResponseDto } from "../../../../dtos/gymAdminDto/expenseDtos";

export interface IFindExpeUseCase {
  execute(id: string): Promise<IExpenseResponseDto>;
}
