import { NextFunction, Request, Response } from "express";
import { ICreateTrainerUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/createTrainerUseCaseInterface";
import { IListAllTrainersUseCase } from "../../../../application/interfaces/useCase/gymAdmin/trainerManagement/listAllTrainersUseCaseInterface";
import { ITrainerCreateRequestDTO } from "../../../../application/dtos/auth/trainerDto";
import { trainerSignupSchema } from "../../../shared/validations/trainerSignUpZodSchema";
import { InvalidDataException } from "../../../../application/constants/exceptions";
import { ResponseHelper } from "../../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../../shared/constants/statusCode/statusCode";
import { TrainerSuccess } from "../../../shared/constants/errorMessage/trainerMessage";
import { IListTrainerRequestDTO } from "../../../../application/dtos/gymAdminDto/listAllTrainersDto";

export class TrainerManagementController {
    constructor(
        private createTrainerUseCase:ICreateTrainerUseCase,
        private listAllTrainerUseCase:IListAllTrainersUseCase
    ){}

    async createTrainer(req:Request,res:Response,next:NextFunction){
        try {
            const newTrainer:ITrainerCreateRequestDTO = req.body;
            const zodValidation = trainerSignupSchema.safeParse(newTrainer)
            if(zodValidation.error){
                throw new InvalidDataException(zodValidation.error.issues[0].message);
            };
            await this.createTrainerUseCase.create(newTrainer);

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
            const data = await this.listAllTrainerUseCase.listAllTrainers(params);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.TRAINERS_LISTED,
                data
            )
        } catch (error) {
            next(error);
        }
    }
}