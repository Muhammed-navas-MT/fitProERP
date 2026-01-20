import { Request, Response, NextFunction } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { ICreateCheckoutSessionUseCase } from "../../../application/interfaces/useCase/gymAdmin/createCheckoutSessionUseCaseInterface";

export class PurchaseSubscriptionController {
  constructor(
    private _createCheckoutSessionUseCase: ICreateCheckoutSessionUseCase
  ) {}

  async handleCheckout(req:Request,res:Response,next:NextFunction){
    try {
      const {planId} = req.body;
      const userId  = res.locals.data.id;
      const data = await this._createCheckoutSessionUseCase.execute({planId,userId});

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "send the Stripe url",
        {data}
      )
    } catch (error) {
      next(error);
    }
  }
}
