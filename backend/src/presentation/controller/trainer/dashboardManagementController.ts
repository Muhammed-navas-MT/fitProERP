import { NextFunction, Request, Response } from "express";
import { IGetDetailUseCase } from "../../../application/interfaces/useCase/trainer/dashboardManagement/getDetailsUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class DashboardController {
  constructor(private _getDetailUseCase: IGetDetailUseCase) {}
  async handleGetDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const trainerId = res.locals.data.id;
      const response = await this._getDetailUseCase.execute(trainerId);
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
