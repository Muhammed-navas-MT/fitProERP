import { NextFunction, Request, Response } from "express";
import { IBlockGymUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/blockGymUseCaseInterface";
import { IListGymsUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/listGymsUseCaseInterFace";
import { IUnBlockGymUseCase } from "../../../application/interfaces/useCase/superAdmin/gymMangement/unBlockGymUseCaseInterface";
import { IListGymsRequestDTO } from "../../../application/dtos/gymAdminDto/gymManagementDtos";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";

export class GymAdminManagementController {
  constructor(
    private _listGymsUseCase: IListGymsUseCase,
    private _blockGymUseCase: IBlockGymUseCase,
    private _unBlockGymUseCase: IUnBlockGymUseCase
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
  }
}
