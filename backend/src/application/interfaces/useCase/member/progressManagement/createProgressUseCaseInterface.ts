import { ICreateProgressDto } from "../../../../dtos/memberDto/progressDto";

export interface ICreateProgressUseCase {
  execute(date: ICreateProgressDto, memberId: string): Promise<void>;
}
