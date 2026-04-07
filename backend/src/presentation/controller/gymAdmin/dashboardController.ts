import { NextFunction, Request, Response } from "express";
import { IGetDashboardUseCaseInterface } from "../../../application/interfaces/useCase/gymAdmin/dashboardManagement/getDashboardDetailUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class GymAdminDashboardController {
  constructor(
    private _getDashboardDetailsUseCase: IGetDashboardUseCaseInterface,
  ) {}

  async handleGetData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const gymAdminId = res.locals.data.id;
      const response =
        await this._getDashboardDetailsUseCase.execute(gymAdminId);
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
