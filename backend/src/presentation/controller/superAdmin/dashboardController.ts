import { NextFunction, Request, Response } from "express";
import { IGetDashboardDetailUseCase } from "../../../application/interfaces/useCase/superAdmin/dashboardManagement/getDashboardDetailUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { Roles } from "../../../domain/enums/roles";
import { BadRequestException } from "../../../application/constants/exceptions";
import { SuperAdminError } from "../../shared/constants/errorMessage/superAdminMessages";

export class SuperAdminDashboardController {
  constructor(private _getDashboardDetailUseCase: IGetDashboardDetailUseCase) {}
  async handleDashboardData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const superAdminId = res.locals.data.id;
      if (res.locals.data.role !== Roles.SUPERADMIN) {
        throw new BadRequestException(SuperAdminError.SUPERADMIN_ONLY);
      }
      const response =
        await this._getDashboardDetailUseCase.execute(superAdminId);
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
