import { NextFunction, Request, Response } from "express";
import { ICreateDietPlanUseCase } from "../../../application/interfaces/useCase/member/dietManagement/createDietPlanUseCaseInterface";
import { IListDietPlanUseCase } from "../../../application/interfaces/useCase/member/dietManagement/listWorkoutUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { DietSuccess } from "../../shared/constants/messages/dietPlanMessage";

export class DietPlanController {
  constructor(
    private _createDietPlanUseCase: ICreateDietPlanUseCase,
    private _listDietPlanUseCase: IListDietPlanUseCase,
  ) {}
  async handleCreateDietPlan(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      await this._createDietPlanUseCase.execute(memberId);
      ResponseHelper.success(HTTP_STATUS_CODE.CREATE, res, DietSuccess.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async handleListDietPlan(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      const response = await this._listDietPlanUseCase.execute(memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        DietSuccess.FOUND,
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
