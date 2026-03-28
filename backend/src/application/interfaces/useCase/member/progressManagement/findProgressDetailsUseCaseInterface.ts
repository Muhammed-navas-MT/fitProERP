import { IFindProgressDto } from "../../../../dtos/memberDto/progressDto";

export interface IFindProgressUseCase {
  execute(progressId: string): Promise<IFindProgressDto>;
}
