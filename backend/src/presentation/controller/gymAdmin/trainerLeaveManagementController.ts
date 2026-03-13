import { NextFunction, Request, Response } from "express";
import { IApproveTrainerLeaveUseCase } from "../../../application/interfaces/useCase/gymAdmin/TrainerLeaveManagement/approvedLeaveUseCaseInterface";
import { IFindTrainerLeaveUseCase } from "../../../application/interfaces/useCase/gymAdmin/TrainerLeaveManagement/findLeaveDetailUseCaseInterface";
import { IListAllTrainerLeaveUseCase } from "../../../application/interfaces/useCase/gymAdmin/TrainerLeaveManagement/listAllTrainerLeaveUseCaseInterface";
import { IRejectTrainerLeaveUseCase } from "../../../application/interfaces/useCase/gymAdmin/TrainerLeaveManagement/rejectLeaveUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { LeaveSuccess } from "../../shared/constants/messages/leaveMessages";
import { ListTrainersLeavesRequestDto } from "../../../application/dtos/shared/leaveDto";

export class TrainerLeaveController {
  constructor(
    private _approveLeaveUseCase: IApproveTrainerLeaveUseCase,
    private _findLeaveDetailUseCae: IFindTrainerLeaveUseCase,
    private _listAllTrainerLeaveUseCase: IListAllTrainerLeaveUseCase,
    private _rejectTrainerLeaveUseCase: IRejectTrainerLeaveUseCase,
  ) {}

  async handleApproveLeave(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { leaveId } = req.params;
      await this._approveLeaveUseCase.execute(leaveId);
      ResponseHelper.success(HTTP_STATUS_CODE.OK, res, LeaveSuccess.APPROVED);
    } catch (error) {
      next(error);
    }
  }

  async handleFindTrainerLeave(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { leaveId } = req.params;
      const leave = await this._findLeaveDetailUseCae.execute(leaveId);
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

  async handleListTrainerLeave(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: ListTrainersLeavesRequestDto = {
        limit: Number(req.query.limit) || 5,
        page: Number(req.query.page) || 1,
        search: String(req.query.search) || "",
        branchId: req.query.branchId ? String(req.query.branchId) : "",
        status: req.query.status ? String(req.query.status) : "",
      };
      const leaves = await this._listAllTrainerLeaveUseCase.execute(
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

  async handleRejectLeave(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { leaveId } = req.params;
      const reason = req.body.reason;
      await this._rejectTrainerLeaveUseCase.execute(leaveId, reason);
      ResponseHelper.success(HTTP_STATUS_CODE.OK, res, LeaveSuccess.REJECTED);
    } catch (error) {
      next(error);
    }
  }
}
