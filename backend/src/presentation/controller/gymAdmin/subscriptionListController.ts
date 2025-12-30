import { NextFunction, Request, Response } from "express";
import { IListAllActiveSubscriptionUseCase } from "../../../application/interfaces/useCase/gymAdmin/listAllSubscriptionUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { SubscriptionError } from "../../shared/constants/errorMessage/subscriptionError";

export class subscriptionlistController {
    constructor(private _listAllSubscriptionUseCase:IListAllActiveSubscriptionUseCase){};
    async listAllActiveSubscription(req:Request,res:Response,next:NextFunction){
        try {
            const subscriptions = await this._listAllSubscriptionUseCase.listAllSubscription()
            console.log(subscriptions,"from list subscription controller....")
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                SubscriptionError.SUBSCRIPTION_LIST,
                subscriptions
            )
        } catch (error) {
            next(error);
        }
    }
}