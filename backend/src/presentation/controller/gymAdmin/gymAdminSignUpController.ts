import { NextFunction,Request,Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { IVerifyEmailAndOtpUseCase } from "../../../application/interfaces/useCase/gymAdmin/verifyEmail&Otp";
import { IVerifyEmailRequestDTO,IVerifyOtpRequestDTO  } from "../../../application/dtos/auth/verifyOtpDto";
import { emailVerificationShema } from "../../shared/validations/emailValidationZodSchema";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";
import { ISignupRequsetDTO } from "../../../application/dtos/auth/gymAdminSignupDto";
import { signupSchema, signupWithConfirmPasswordSchema } from "../../shared/validations/gymAdminSignUpZodSchema";
import { GymAdminAuthError } from "../../shared/constants/errorMessage/gymAdminAuthError";
import { ISingupUseCase } from "../../../application/interfaces/useCase/gymAdmin/gymAdminSignUpUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class SignUpController {
    constructor(private _VerifyEmailAndOtpUseCase:IVerifyEmailAndOtpUseCase,private _singupUseCase:ISingupUseCase){};

    async verifyEmail(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const data:IVerifyEmailRequestDTO = req.body;
            console.log(req.body);
            
            const validationError = emailVerificationShema.safeParse(data);
            if(validationError.error){
                throw new InvalidDataException(validationError.error.issues[0].message);
            }

            await this._VerifyEmailAndOtpUseCase.signUpSendOtp(data);
            ResponseHelper.success(
                200,
                res,
                GymAdminAuthSuccess.OTP_SUCCESSFULL
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
                GymAdminAuthSuccess.OTP_VERIFIED_SUCCESSFULL
            );
        } catch (error) {
            next(error);
        }
    }

    async signup(req:Request,res:Response,next:NextFunction) {
        try {
            const gymAdminData:ISignupRequsetDTO = req.body;
            gymAdminData.subdomain = gymAdminData.gymName.toLowerCase();

            const zodValication =signupSchema.safeParse(gymAdminData);
            if(zodValication.error){
                throw new InvalidDataException(zodValication.error.issues[0].message)
            }

            const confirmPassword = signupWithConfirmPasswordSchema.safeParse(gymAdminData);
            if(confirmPassword.error){
                throw new InvalidDataException(GymAdminAuthError.PASSWORDS_DO_NOT_MATCH)
            };

            await this._singupUseCase.signUp(gymAdminData);
            
            ResponseHelper.success(
                HTTP_STATUS_CODE.CREATE,
                res,
                GymAdminAuthSuccess.REGISTRATION_SUCCESS
            )
        } catch (error) {
            next(error)
        }
    }
}