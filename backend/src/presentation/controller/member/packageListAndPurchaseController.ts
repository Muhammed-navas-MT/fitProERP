import { NextFunction, Request, Response } from "express";
import { IListActivePackagesUseCase } from "../../../application/interfaces/useCase/member/packageAndPurchaseManagement/listAcitvePackagesUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { PackageSuccessMessage } from "../../shared/constants/messages/packageMessages";
import { ICreateMemberCheckoutSessionUseCase } from "../../../application/interfaces/useCase/member/packageAndPurchaseManagement/createMemberCheckoutUseCaseInterface";

export class PackageListAndCheckoutController {
    constructor(
        private _listPackageUseCase:IListActivePackagesUseCase,
        private _createCheckoutUseCase:ICreateMemberCheckoutSessionUseCase
    ){}
    async listPackages(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const memberId = res.locals.data.id;
            const packages = await this._listPackageUseCase.execute(memberId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                PackageSuccessMessage.LISTED,
                packages
            )
        } catch (error) {
            next(error);
        }
    }

    async handleCheckout(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {planId} = req.body;
            const {subdomain,id} = res.locals.data;
            const url = await this._createCheckoutUseCase.execute({planId,userId:id,subdomain})
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                "send the Stripe url",
                {url}
            )
        } catch (error) {
            next(error);
        }
    }
}