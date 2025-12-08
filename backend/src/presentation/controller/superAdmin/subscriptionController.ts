import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { ISubscriptionUseCase } from "../../../application/interfaces/useCase/superAdmin/subscriptionUseCase";
import { IListSubscriptionRequestDTO, ISubscriptionRequestDTO } from "../../../application/dtos/superAdminDto/subscriptionDto";
import { subscriptionSchema } from "../../shared/validations/subscriptionZodSchema";
import { SubscriptionError } from "../../shared/constants/errorMessage/subscriptionError";
import { InvalidDataException } from "../../../application/constants/exceptions";

export class SubscriptionController {
  constructor(private _subscriptionUseCase: ISubscriptionUseCase) {}

  async createSubscription(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const subscription: ISubscriptionRequestDTO = req.body;

      const validationError = subscriptionSchema.safeParse(subscription);
      if(validationError.error){
        throw new InvalidDataException(validationError.error.issues[0].message);
      }

      console.log("subsrtiption")
      const id = await this._subscriptionUseCase.createSubscription(subscription);
      ResponseHelper.success(
        201,
        res,
        SubscriptionError.SUBSCRIPTION_CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  async blockSubscription(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {subscriptionId} = req.params;
      await this._subscriptionUseCase.blockSubscription(subscriptionId);
      ResponseHelper.success(
        200,
        res,
        SubscriptionError.SUBSCRIPTION_UPDATED
      )
    } catch (error) {
      next(error)
    }
  }

  async unBlockSubscription(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {subscriptionId} = req.params;
      await this._subscriptionUseCase.unBlockSubscription(subscriptionId);
      ResponseHelper.success(
        200,
        res,
        SubscriptionError.SUBSCRIPTION_UPDATED
      )
    } catch (error) {
      next(error)
    }
  }

  async findSubscription(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {subscriptionId} = req.params;
      const subscription = await this._subscriptionUseCase.findSubscripition(subscriptionId);
      ResponseHelper.success(
        200,
        res,
        SubscriptionError.SUBSCRIPTION_FOUND,
        subscription
      )
    } catch (error) {
      next(error)
    }
  }

  async updateSubscription(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const subscription:ISubscriptionRequestDTO = req.body;

      const validationError = subscriptionSchema.safeParse(subscription);
      if(validationError.error){
        throw new InvalidDataException(validationError.error.issues[0].message);
      }

      const {subscriptionId} = req.params;
      await this._subscriptionUseCase.updateSubscription(subscription,subscriptionId);
      ResponseHelper.success(
        200,
        res,
        SubscriptionError.SUBSCRIPTION_UPDATED
      )
    } catch (error) {

      next(error)
    }
  }

  async listAllSubscription(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const params:IListSubscriptionRequestDTO = {
        search:(req.query?.search as string) || "",
        limit:Number(req.query?.limit) || 5,
        page:Number(req.query?.page) || 1
      }

      const data = await this._subscriptionUseCase.listSubscriptions(params);
      ResponseHelper.success(
        200,
        res,
        SubscriptionError.SUBSCRIPTION_FOUND,
        data
      )

    } catch (error) {
      next(error);
    }
  }
  
}
