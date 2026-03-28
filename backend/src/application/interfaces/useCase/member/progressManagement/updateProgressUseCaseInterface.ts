import { IUpdateProgressDto } from "../../../../dtos/memberDto/progressDto";

export interface IUpdateProgressUseCase {
  execute(date: IUpdateProgressDto, progressId: string): Promise<void>;
}
