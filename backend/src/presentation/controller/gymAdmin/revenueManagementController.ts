import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IListRevenueUseCase } from "../../../application/interfaces/useCase/gymAdmin/revenueManagement/listRevenueUseCaseInterfance";
import { IFindRevenueUseCase } from "../../../application/interfaces/useCase/gymAdmin/revenueManagement/findRevenueUseCaseInterface";
import { IListRevenueRequestDTO } from "../../../application/dtos/gymAdminDto/revenueDto";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { RevenueSuccess } from "../../shared/constants/messages/revenueMessages";

export class GymAdminRevenueController {
  constructor(
    private _listAllRevenues: IListRevenueUseCase,
    private _findRevenue: IFindRevenueUseCase,
  ) {}
  async listAllRevenues(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: IListRevenueRequestDTO = {
        limit: Number(req.query.limit) || 5,
        page: Number(req.query.page) || 1,
        search: String(req.query.search) || "",
        branchId: req.query.branchId ? String(req.query.branchId) : "",
        gymId: res.locals.data.id,
        sourceType: req.query.sourceType ? String(req.query.sourceType) : "",
      };
      const data = await this._listAllRevenues.execute(params);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        RevenueSuccess.LISTED,
        data,
      );
    } catch (error) {
      next(error);
    }
  }

  async findRevenue(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { revenueId } = req.params;
      const data = await this._findRevenue.execute(revenueId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        RevenueSuccess.FOUND,
        data,
      );
    } catch (error) {
      next(error);
    }
  }
}
