import { NextFunction, Request, Response } from "express";
import { IGetDashboardDetailUseCase } from "../../../application/interfaces/useCase/superAdmin/dashboardManagement/getDashboardDetailUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class SuperAdminDashboardController {
  constructor(private _getDashboardDetailUseCase: IGetDashboardDetailUseCase) {}
  async handleDashboardData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const superAdminId = res.locals.data.id;
      const response =
        await this._getDashboardDetailUseCase.execute(superAdminId);
      console.log(response, "in super admin dasboard");
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Data fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
