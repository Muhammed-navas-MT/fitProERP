import { NextFunction, Request, Response } from "express";
import { ICreateLeaveUseCase } from "../../../application/interfaces/useCase/trainer/leaveManagement/createLeaveUseCaseInterface";
import { IFindLeaveUseCase } from "../../../application/interfaces/useCase/trainer/leaveManagement/findLeaveUseCaseInterface";
import { IListAllLeavesUseCase } from "../../../application/interfaces/useCase/trainer/leaveManagement/listAllLeavesUseCaseInterface";
import {
  CreateLeaveRequestDto,
  ListLeavesRequestDto,
  UpdateLeaveRequestDto,
} from "../../../application/dtos/shared/leaveDto";
import { CreateLeaveSchema } from "../../shared/validations/leaveValidationZodSchema";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { LeaveSuccess } from "../../shared/constants/messages/leaveMessages";
import { IUpdateLeaveUseCase } from "../../../application/interfaces/useCase/trainer/leaveManagement/updateLeaveUseCaseInterface";

export class LeaveController {
  constructor(
    private _createLeaveUseCase: ICreateLeaveUseCase,
    private _findLeaveUseCase: IFindLeaveUseCase,
    private _listAllLeavesUseCase: IListAllLeavesUseCase,
    private _updateLeaveUseCase: IUpdateLeaveUseCase,
  ) {}
  async handleCreateLeave(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const leave: CreateLeaveRequestDto = req.body;
      console.log(leave)
      const validationResult = CreateLeaveSchema.safeParse(leave);
      if (!validationResult.success) {
        throw new InvalidDataException(
          validationResult.error.issues[0].message,
        );
      }
      await this._createLeaveUseCase.execute({
        ...leave,
        trainerId: res.locals.data.id,
      });
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        LeaveSuccess.CREATED,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleFindLeave(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { leaveId } = req.params;
      const leave = await this._findLeaveUseCase.execute(leaveId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        LeaveSuccess.FOUND,
        leave,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleListLeave(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: ListLeavesRequestDto = {
        limit: Number(req.query.limit) || 5,
        search: String(req.query.search) || "",
        page: Number(req.query.page) || 1,
        status: req.query.status ? String(req.query.status) : "",
      };
      const leaves = await this._listAllLeavesUseCase.execute(
        params,
        res.locals.data.id,
      );
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        LeaveSuccess.LISTED,
        leaves,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleUpdateLeave(req: Request, res: Response, next: NextFunction) {
    try {
      const { leaveId } = req.params;
      const updateData: UpdateLeaveRequestDto = req.body;
      const validationResult = CreateLeaveSchema.safeParse(updateData);
      if (!validationResult.success) {
        throw new InvalidDataException(
          validationResult.error.issues[0].message,
        );
      }
      await this._updateLeaveUseCase.execute(
        { ...updateData, trainerId: res.locals.data.id },
        leaveId,
      );
      ResponseHelper.success(HTTP_STATUS_CODE.OK, res, LeaveSuccess.UPDATED);
    } catch (error) {
      next(error);
    }
  }
}
