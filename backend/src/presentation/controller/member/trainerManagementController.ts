import { NextFunction, Request, Response } from "express";
import { IListActiveTrainerUseCase } from "../../../application/interfaces/useCase/member/listActiveTrainersUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { TrainerSuccess } from "../../shared/constants/errorMessage/trainerMessage";

export class TrainerController {
  constructor(private _listActiveTrainersUseCase: IListActiveTrainerUseCase) {}
  async listActiveTrainers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      const trainers = await this._listActiveTrainersUseCase.execute(memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        TrainerSuccess.TRAINERS_LISTED,
        trainers,
      );
    } catch (error) {
      next(error);
    }
  }
}
