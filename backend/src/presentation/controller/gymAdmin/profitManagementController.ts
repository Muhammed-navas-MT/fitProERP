import { NextFunction, Request, Response } from "express";
import { IGetProfitAnalyticsUseCase } from "../../../application/interfaces/useCase/gymAdmin/profitManagement/getProfitAnalyticsUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class ProfitController {
  constructor(private _getProfitAnalyticsUseCase: IGetProfitAnalyticsUseCase) {}

  async getProfitAnalytics(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const gymId = res.locals.data.id;

      const { startDate, endDate } = req.query;

      let start: Date;
      let end: Date;

      if (!startDate || !endDate) {
        end = new Date();
        start = new Date();
        start.setMonth(end.getMonth() - 6);
      } else {
        start = new Date(startDate as string);
        end = new Date(endDate as string);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          res.status(400).json({
            success: false,
            message: "Invalid date format",
          });
          return;
        }
      }

      const response = await this._getProfitAnalyticsUseCase.execute(
        gymId,
        start,
        end,
      );

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Get profit analytics successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
