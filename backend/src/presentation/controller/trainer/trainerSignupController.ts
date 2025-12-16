import { NextFunction,Request,Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { TrainerSuccess } from "../../shared/constants/errorMessage/trainerMessage";
import { ITrainerSignUpRequestDTO } from "../../../application/dtos/auth/trainerDto";
import { ISingupTrainerUseCase } from "../../../application/interfaces/useCase/trainer/signUpUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { trainerSignupSchema } from "../../shared/validations/trainerSignUpZodSchema";
import { IListTrainerRequestDTO } from "../../../application/dtos/trainerDto/listAllTrainerDto";

export class TrainerSignUpController {
    constructor(private _singupTraninerUseCase:ISingupTrainerUseCase){};

    async signup(req:Request,res:Response,next:NextFunction) {
        try {
            const trainerData:ITrainerSignUpRequestDTO = req.body;
            console.log(trainerData,"fromd add trainer")
            const zodValication =trainerSignupSchema.safeParse(trainerData);
            if(zodValication.error){
                console.log(zodValication.error.issues[0].message)
                throw new InvalidDataException(zodValication.error.issues[0].message)
            }
            await this._singupTraninerUseCase.signUp(trainerData);
            
            ResponseHelper.success(
                HTTP_STATUS_CODE.CREATE,
                res,
                TrainerSuccess.REGISTRATION_SUCCESS
            )
        } catch (error) {
            next(error)
        }
    }

    async listAllTrainer(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const params:IListTrainerRequestDTO = {
                search:(req.query?.search as string) || "",
                limit:Number(req.query?.limit) || 5,
                page:Number(req.query?.page) || 1,
                gymId:(req.query.gymId as string) || ""
            }
            const data = await this._singupTraninerUseCase.listAllTrainers(params);
            ResponseHelper.success(
                200,
                res,
                TrainerSuccess.TRAINERS_LISTED,
                data
            )
        } catch (error) {
            next(error);
        }
    }
}