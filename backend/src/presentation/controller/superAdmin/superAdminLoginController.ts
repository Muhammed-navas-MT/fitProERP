import { SuperAdminLoginUseCase } from "../../../application/interfaces/useCase/superAdmin/superAdminLoginUseCase";
import { NextFunction,Request,Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";

export class SuperAdminController {
    constructor (
        private _superAdminLoginUseCase:SuperAdminLoginUseCase
    ){}

     async superAdminLogin(req:Request,res:Response,next:NextFunction):Promise<void>{

        try {
            console.log(req.body)
            const {email,password} = req.body;
            const superAdmin = await this._superAdminLoginUseCase.superAdminLogin({email,password});
            console.log(superAdmin);

            ResponseHelper.success(
                200,
                res,
                "superAdmin login successful",
                superAdmin
            );

        } catch (error) {
            next(error);
        }
    }
}