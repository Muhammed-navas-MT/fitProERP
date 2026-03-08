import { IGenerateMonthlyProfitUseCase } from "../../application/interfaces/useCase/gymAdmin/profitManagement/generateMonthlyProfitUseCaseInterface";

export class GenerateMonthlyProfitJob {
  constructor(
    private _generateMonthlyProfitUseCase: IGenerateMonthlyProfitUseCase,
  ) {}

  async generateMonthlyProfit(): Promise<void> {
    try {
      await this._generateMonthlyProfitUseCase.execute();
      console.log("Monthly profit generated successfully");
    } catch (error) {
      console.error("Error generating monthly profit:", error);
    }
  }
}
