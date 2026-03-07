import {
  IListExpenseRequestDto,
  IListExpenseResponseDto,
} from "../../../../dtos/gymAdminDto/expenseDtos";

export interface IListAllExpenseUseCase {
  execute(params: IListExpenseRequestDto): Promise<IListExpenseResponseDto>;
}
