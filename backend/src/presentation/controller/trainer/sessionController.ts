import { NextFunction, Request, Response } from "express";
import { ListSessionRequestDto } from "../../../application/dtos/trainerDto/sessionDto";
import { IListTrainerSessionUseCase } from "../../../application/interfaces/useCase/trainer/sessionManagement/listAllSessionsUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IMarkAsCompletedUseCase } from "../../../application/interfaces/useCase/trainer/sessionManagement/markAsComplitedUseCaseInterface";

export class SessionController {
  constructor(
    private _listSessionUseCase: IListTrainerSessionUseCase,
    private _markAsComplitedUseCase: IMarkAsCompletedUseCase,
  ) {}
  async handleListSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: ListSessionRequestDto = {
        limit: Number(req.query.limit) || 5,
        page: Number(req.query.page) || 1,
        trainerId: res.locals.data.id,
      };
      const response = await this._listSessionUseCase.execute(params);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Trainer session listed successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
  async handleMarkAsComplitedSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { sessionId } = req.params;
      await this._markAsComplitedUseCase.execute(sessionId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Session Completed Successfully",
        { sessionId },
      );
    } catch (error) {
      next(error);
    }
  }
}
