import { NextFunction, Request, Response } from "express";
import { IChangePasswordUseCase } from "../../../application/interfaces/useCase/trainer/profileManagement/changePasswordUseCaseInterface";
import { IUpdateProfileUseCase } from "../../../application/interfaces/useCase/trainer/profileManagement/updateProfileUseCaseInterface";
import { IViewProfileUseCase } from "../../../application/interfaces/useCase/trainer/profileManagement/viewProfileUseCaseInterface";
import { IChangePasswordRequestDTO, IUpdateTrainerDTO } from "../../../application/dtos/trainerDto/listAllTrainerDto";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { TrainerSuccess } from "../../shared/constants/errorMessage/trainerMessage";

export class ProfileManagementController {
    constructor(
        private _changePasswordUseCase:IChangePasswordUseCase,
        private _updateProfileUseCase:IUpdateProfileUseCase,
        private _viewProfileUseCase:IViewProfileUseCase
    ){}

    async changePassword(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const data:IChangePasswordRequestDTO = {...req.body,trainerId:res.locals.data.id}
            await this._changePasswordUseCase.execute(data);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.PASSWORD_CHANGED
            )
        } catch (error) {
            next(error);
        }
    };

    async updateProfile(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const data:IUpdateTrainerDTO = req.body;
            const trainerId = res.locals.data.id
            await this._updateProfileUseCase.execute(data,trainerId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.PROFILE_UPDATED
            )
        } catch (error) {
            next(error)
        }
    };

    async viewProfile(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const trainerId = res.locals.data.id;
            const trainer = await this._viewProfileUseCase.execute(trainerId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.TRAINER_FETCHED,
                trainer
            )
        } catch (error) {
            next(error)
        }
    }
}