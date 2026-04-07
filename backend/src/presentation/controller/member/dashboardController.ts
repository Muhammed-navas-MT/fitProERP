import { NextFunction, Request, Response } from "express";
import { IGetDashboardDetailUseCase } from "../../../application/interfaces/useCase/member/dashboardManagement/getDashboardDetailUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class DashboardController {
  constructor(private _getDashboardDetailUseCase: IGetDashboardDetailUseCase) {}
  async handleDashboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      const data = await this._getDashboardDetailUseCase.execute(memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Data fetched successfully",
        data,
      );
    } catch (error) {
      next(error);
    }
  }
}
