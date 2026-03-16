import { NextFunction, Request, Response } from "express";
import { ICreateWorkoutPlanUseCase } from "../../../application/interfaces/useCase/member/workoutPlanManagement/createWorkoutPlanUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IListWorkoutPlanUseCase } from "../../../application/interfaces/useCase/member/workoutPlanManagement/listWorkoutPlanUseCaseInterface";
import { WorkoutSuccess } from "../../shared/constants/messages/workoutMessages";

export class WorkoutPlanController {
  constructor(
    private _createWorkoutPlanUseCase: ICreateWorkoutPlanUseCase,
    private _listWorkoutPlanUseCase: IListWorkoutPlanUseCase,
  ) {}
  async handleCreateWorkoutPlan(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      await this._createWorkoutPlanUseCase.execute(memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Workout plan created successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async handleListWorkoutPlan(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      const response = await this._listWorkoutPlanUseCase.execute(memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        WorkoutSuccess.FOUND,
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
