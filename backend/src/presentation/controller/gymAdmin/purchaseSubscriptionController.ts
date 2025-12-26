import { Request, Response, NextFunction } from "express";
import { IPurchaseSubscriptionUseCase } from "../../../application/interfaces/useCase/gymAdmin/purchaseSubscriptionUseCaseInterface";
import { PurchaseSubscriptionDTO } from "../../../application/dtos/gymAdminDto/purchaseSubscriptionDto";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";

export class PurchaseSubscriptionController {
  constructor(
    private readonly _purchaseSubscriptionUseCase: IPurchaseSubscriptionUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: gymId} = res.locals.data;
      const { packageId, amount, paymentMethod }:PurchaseSubscriptionDTO = req.body;
      const payload: PurchaseSubscriptionDTO = {
        gymId,
        packageId,
        amount,
        paymentMethod,
      };

      await this._purchaseSubscriptionUseCase.execute(payload);
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        GymAdminAuthSuccess.SUBSCRIPTION_PURCHASED,
      )
    } catch (error) {
      next(error);
    }
  }
}
