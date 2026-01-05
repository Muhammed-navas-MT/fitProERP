import { NextFunction, Request, Response } from "express";
import { ICreateTrainerUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/createTrainerUseCaseInterface";
import { IListAllTrainersUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/listAllTrainersUseCaseInterface";
import { ITrainerCreateRequestDTO, ITrainerUpdateDTO } from "../../../../application/dtos/auth/trainerDto";
import { trainerSignupSchema } from "../../../shared/validations/trainerSignUpZodSchema";
import { InvalidDataException } from "../../../../application/constants/exceptions";
import { ResponseHelper } from "../../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../../shared/constants/statusCode/statusCode";
import { TrainerSuccess } from "../../../shared/constants/errorMessage/trainerMessage";
import { IListTrainerRequestDTO } from "../../../../application/dtos/gymAdminDto/listAllTrainersDto";
import { IBlockTrainerUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/blockTrainerUseCaseInterface";
import { IUnBlockTrainerUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/unBlockTrainerUseCaseInterface";
import { IFindTrainerUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/findTrainerUseCaseInterface";
import { IUpdateTrainerUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/updateTrainerUseCaseInterface";
import { IUpdateSubscriptionUseCase } from "../../../../application/interfaces/useCase/superAdmin/subscription/updateSubscriptionUseCaseInterface";
import { IUpdateTrainerDTO } from "../../../../application/dtos/trainerDto/listAllTrainerDto";
import { IListActiveTrainersByBranchIdUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/listActiveTrainersUseCase";

export class TrainerManagementController {
    constructor(
        private _createTrainerUseCase:ICreateTrainerUseCase,
        private _listAllTrainerUseCase:IListAllTrainersUseCase,
        private _blockTrainerUseCase:IBlockTrainerUseCase,
        private _unBlockTrainerUseCase:IUnBlockTrainerUseCase,
        private _findTrainerUseCase:IFindTrainerUseCase,
        private _updateTrainerUseCase:IUpdateTrainerUseCase,
        private _listaAllActiveTrainers:IListActiveTrainersByBranchIdUseCase
    ){}

    async createTrainer(req:Request,res:Response,next:NextFunction){
        try {
            const newTrainer:ITrainerCreateRequestDTO = req.body;
            const zodValidation = trainerSignupSchema.safeParse(newTrainer)
            if(zodValidation.error){
                throw new InvalidDataException(zodValidation.error.issues[0].message);
            };
            await this._createTrainerUseCase.create(newTrainer);

            ResponseHelper.success(
                HTTP_STATUS_CODE.CREATE,
                res,
                TrainerSuccess.REGISTRATION_SUCCESS
            )
        } catch (error) {
            next(error);
        }
    };

    async listAllTrainers(req:Request,res:Response,next:NextFunction){
        try {
            const params:IListTrainerRequestDTO = {
                search:(req.query?.search as string) || "",
                limit:Number(req.query?.limit) || 5,
                page:Number(req.query?.page) || 1,
                gymId:(req.query?.gymId as string) || "",
            };
            const data = await this._listAllTrainerUseCase.listAllTrainers(params);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.TRAINERS_LISTED,
                data
            )
        } catch (error) {
            next(error);
        }
    };

    async blockTrainer(req:Request,res:Response,next:NextFunction){
        try {
             const {trainerId} = req.params;
                  await this._blockTrainerUseCase.blockTrainer(trainerId);
                  ResponseHelper.success(
                    HTTP_STATUS_CODE.OK,
                    res,
                    TrainerSuccess.TRAINER_UPDATED
                  )
        } catch (error) {
            next(error)
        }
    }

    async unBlockTrainer(req:Request,res:Response,next:NextFunction){
        try {
             const {trainerId} = req.params;
                  await this._unBlockTrainerUseCase.unBlockTrainer(trainerId);
                  ResponseHelper.success(
                    HTTP_STATUS_CODE.OK,
                    res,
                    TrainerSuccess.TRAINER_UPDATED
                  )
        } catch (error) {
            next(error)
        }
    };

    async findTrainer(req:Request,res:Response,next:NextFunction){
        try {
            const {trainerId} = req.params;
            const trainer = await this._findTrainerUseCase.findTrainer(trainerId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.TRAINER_UPDATED,
                trainer
            )
        } catch (error) {
            next(error)
        }
    }

    async updateTrainer(req:Request,res:Response,next:NextFunction){
        try {
            const data:IUpdateTrainerDTO = req.body;
            const {trainerId} = req.params;
            await this._updateTrainerUseCase.updateTrainer(data,trainerId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.PROFILE_UPDATED
            )
        } catch (error) {
            next(error);
        }
    }

    async listAllActiveTrainers(req:Request,res:Response,next:NextFunction){
        try {
            const branchId = req.query.branchId as string || ""
            const trainers = await this._listaAllActiveTrainers.listTrainers(res.locals.data.id,branchId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.TRAINERS_LISTED,
                trainers
            )
        } catch (error) {
            next(error);
        }
    }
}