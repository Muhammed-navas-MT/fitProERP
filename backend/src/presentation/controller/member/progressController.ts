import { NextFunction, Request, Response } from "express";
import {
  ICreateProgressDto,
  IListProgressRequestDto,
  IUpdateProgressDto,
} from "../../../application/dtos/memberDto/progressDto";
import { ICreateProgressUseCase } from "../../../application/interfaces/useCase/member/progressManagement/createProgressUseCaseInterface";
import { IFindProgressUseCase } from "../../../application/interfaces/useCase/member/progressManagement/findProgressDetailsUseCaseInterface";
import { IListAllProgressUseCase } from "../../../application/interfaces/useCase/member/progressManagement/listAllProgressUseCaseInterface";
import { IUpdateProgressUseCase } from "../../../application/interfaces/useCase/member/progressManagement/updateProgressUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import {
  CreateProgressSchema,
  UpdateProgressSchema,
} from "../../shared/validations/progressZodSchema";
import { BadRequestException } from "../../../application/constants/exceptions";
import { IFindProgressGraphDataUseCase } from "../../../application/interfaces/useCase/member/progressManagement/findProgressGraphDataUseCaseInterface";

export class ProgressController {
  constructor(
    private _createProgeressUseCase: ICreateProgressUseCase,
    private _findProgressUseCase: IFindProgressUseCase,
    private _listProgressUseCase: IListAllProgressUseCase,
    private _updateProgressUseCase: IUpdateProgressUseCase,
    private _findProgressGraphDataUseCase: IFindProgressGraphDataUseCase,
  ) {}
  async handleCreateProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const progress: ICreateProgressDto = req.body;
      const validationResult = CreateProgressSchema.safeParse(progress);
      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.issues[0].message);
      }

      const memberId = res.locals.data.id;
      await this._createProgeressUseCase.execute(
        validationResult.data,
        memberId,
      );
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Progress created successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async handleFindProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const progressId = req.params.progressId;
      const progress = await this._findProgressUseCase.execute(progressId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Progress fetched successfully",
        progress,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleUpdateProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const progress: IUpdateProgressDto = req.body;
      const progressId = req.params.progressId;

      const validationResult = UpdateProgressSchema.safeParse(progress);
      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.issues[0].message);
      }

      await this._updateProgressUseCase.execute(
        validationResult.data,
        progressId,
      );

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Progress updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }
  async handleListProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: IListProgressRequestDto = {
        limit: Number(req.query.limit) || 5,
        memberId: res.locals.data.id,
        page: Number(req.query.page) || 1,
      };

      const progresses = await this._listProgressUseCase.execute(params);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Progress fetched successfully",
        progresses,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleGetProgressGraphData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      const progresses =
        await this._findProgressGraphDataUseCase.execute(memberId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Progress graph data fetched successfully",
        progresses,
      );
    } catch (error) {
      next(error);
    }
  }
}
