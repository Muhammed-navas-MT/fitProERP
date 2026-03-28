import {
  IListProgressRequestDto,
  IListProgressResponseDto,
} from "../../../../dtos/memberDto/progressDto";

export interface IListAllProgressUseCase {
  execute(params: IListProgressRequestDto): Promise<IListProgressResponseDto>;
}
