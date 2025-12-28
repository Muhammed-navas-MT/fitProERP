import { NextFunction, Request, Response } from "express";
import { IBlockGymUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/blockGymUseCaseInterface";
import { IListGymsUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/listGymsUseCaseInterFace";
import { IUnBlockGymUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/unBlockGymUseCaseInterface";
import { IListGymsRequestDTO } from "../../../application/dtos/superAdminDto/gymManagementDtos";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";
import { IFindGymUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/findGymUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IApproveGymUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/approveGymUseCaseInterface";
import { IRejectGymUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/rejectGymUseCaseInterface";

export class GymAdminManagementController {
  constructor(
    private _listGymsUseCase: IListGymsUseCase,
    private _blockGymUseCase: IBlockGymUseCase,
    private _unBlockGymUseCase: IUnBlockGymUseCase,
    private _findgym:IFindGymUseCase,
    private _approveGym:IApproveGymUseCase,
    private _rejectGym:IRejectGymUseCase
  ) {}

  async listGyms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params: IListGymsRequestDTO = {
        search: (req.query?.search as string) || "",
        limit: Number(req.query?.limit) || 5,
        page: Number(req.query?.page) || 1,
      };

      const data = await this._listGymsUseCase.listAllGym(params);
      ResponseHelper.success(200, res, GymAdminAuthSuccess.GYMS_LISTED, data);
    } catch (error) {
      next(error);
    }
  }

  async blockGym(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { gymId } = req.params;
      await this._blockGymUseCase.blockGym(gymId);
      ResponseHelper.success(200, res, GymAdminAuthSuccess.GYM_UPDATED);
    } catch (error) {
      next(error);
    }
  }

  async unBlockGym(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { gymId } = req.params;
      await this._unBlockGymUseCase.unBlockGym(gymId);
      ResponseHelper.success(200, res, GymAdminAuthSuccess.GYM_UPDATED);
    } catch (error) {
      next(error);
    }
  };
  async findGym(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const id = req.params.gymId;
      const gymDetail = await this._findgym.findGym(id)
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_DETAIL,
        gymDetail
      )
    } catch (error) {
      next(error);
    }
  };
  async approveGym(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const id = req.params.gymId;
      await this._approveGym.approve(id);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_APPROVED
      )
    } catch (error) {
      next(error)
    }
  };
  async rejectGym(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const id = req.params.gymId;
      const reason = req.body.reason
      await this._rejectGym.reject(id,reason);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_REJECTED
      )
    } catch (error) {
      next(error)
    }
  };
}
