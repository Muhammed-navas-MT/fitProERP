import { NextFunction,Request,Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { IVerifyEmailAndOtpUseCase } from "../../../application/interfaces/useCase/trainer/verifyOtpAndEmailUseCaseInterface";
import { IVerifyEmailRequestDTO,IVerifyOtpRequestDTO  } from "../../../application/dtos/auth/verifyOtpDto";
import { emailVerificationShema } from "../../shared/validations/emailValidationZodSchema";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { TrainerSuccess } from "../../shared/constants/errorMessage/trainerMessage";
import { ITrainerSignUpRequestDTO } from "../../../application/dtos/auth/trainerDto";
import { TrainerError } from "../../shared/constants/errorMessage/trainerMessage";
import { ISingupTrainerUseCase } from "../../../application/interfaces/useCase/trainer/signUpUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { trainerSignupWithConfirmPasswordSchema,trainerSignupSchema } from "../../shared/validations/trainerSignUpZodSchema";

export class TrainerSignUpController {
    constructor(private _VerifyEmailAndOtpUseCase:IVerifyEmailAndOtpUseCase,private _singupTraninerUseCase:ISingupTrainerUseCase){};

    async verifyEmail(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const data:IVerifyEmailRequestDTO = req.body;            
            const validationError = emailVerificationShema.safeParse(data);
            if(validationError.error){
                throw new InvalidDataException(validationError.error.issues[0].message);
            }

            await this._VerifyEmailAndOtpUseCase.signUpSendOtp(data);
            ResponseHelper.success(
                200,
                res,
                TrainerSuccess.OTP_SUCCESSFULL
            );
        } catch (error) {
            next(error);
        }
    };

    async verifyOtp(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const otp:IVerifyOtpRequestDTO = req.body;
            await this._VerifyEmailAndOtpUseCase.verify(otp);
            ResponseHelper.success(
                200,
                res,
                TrainerSuccess.OTP_VERIFIED_SUCCESSFULL
            );
        } catch (error) {
            next(error);
        }
    }

    async signup(req:Request,res:Response,next:NextFunction) {
        try {
            const trainerData:ITrainerSignUpRequestDTO = req.body;

            const zodValication =trainerSignupSchema.safeParse(trainerData);
            if(zodValication.error){
                throw new InvalidDataException(zodValication.error.issues[0].message)
            }
            const confirmPassword = trainerSignupWithConfirmPasswordSchema.safeParse(trainerData);
            if(confirmPassword.error){
                throw new InvalidDataException(TrainerError.PASSWORDS_DO_NOT_MATCH)
            };

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
}