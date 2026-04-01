import { IMonthlyProgressReport } from "../../../../dtos/memberDto/progressDto";

export interface IFindProgressGraphDataUseCase {
  execute(memberId: string): Promise<IMonthlyProgressReport[]>;
}
