import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { IListSubscriptionRequestDTO, ISubscriptionRequestDTO } from "../../../application/dtos/superAdminDto/subscriptionDto";
import { subscriptionSchema } from "../../shared/validations/subscriptionZodSchema";
import { SubscriptionError } from "../../shared/constants/errorMessage/subscriptionError";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { IBlockSubscriptionUseCase } from "../../../application/interfaces/useCase/superAdmin/subscription/blockSubscriptionUseCaseInterface";
import { ICreateSubscriptionUseCase } from "../../../application/interfaces/useCase/superAdmin/subscription/createSubscriptionUseCaseInterface";
import { IFindSubscriptionUseCase } from "../../../application/interfaces/useCase/superAdmin/subscription/findSubscripitionUseCaseInterface";
import { IListSubscriptionUseCase } from "../../../application/interfaces/useCase/superAdmin/subscription/listSubscriptionsUseCaseInterface";
import { IUnBlockSubscriptionUseCase } from "../../../application/interfaces/useCase/superAdmin/subscription/unBlockSubscriptionUseCaseInterface";
import { IUpdateSubscriptionUseCase } from "../../../application/interfaces/useCase/superAdmin/subscription/updateSubscriptionUseCaseInterface";

export class SubscriptionController {
  constructor(
    private _blockSubscriptionUseCase: IBlockSubscriptionUseCase,
    private _createSubscriptionUseCase: ICreateSubscriptionUseCase,
    private _findSubscriptionUseCase: IFindSubscriptionUseCase,
    private _listSubscriptionUseCase: IListSubscriptionUseCase,
    private _unBlockSubscriptionUseCase: IUnBlockSubscriptionUseCase,
    private _updateSubscriptionUseCase: IUpdateSubscriptionUseCase
  ) {}

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
      const id = await this._createSubscriptionUseCase.createSubscription(subscription);
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
      await this._blockSubscriptionUseCase.blockSubscription(subscriptionId);
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
      await this._unBlockSubscriptionUseCase.unBlockSubscription(subscriptionId);
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
      const subscription = await this._findSubscriptionUseCase.findSubscripition(subscriptionId);
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
      await this._updateSubscriptionUseCase.updateSubscription(subscription,subscriptionId);
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

      const data = await this._listSubscriptionUseCase.listSubscriptions(params);
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
