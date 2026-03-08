import { NextFunction, Request, Response } from "express";
import { IListActivePackagesUseCase } from "../../../application/interfaces/useCase/member/packageAndPurchaseManagement/listAcitvePackagesUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { PackageSuccessMessage } from "../../shared/constants/messages/packageMessages";
import { ICreateMemberCheckoutSessionUseCase } from "../../../application/interfaces/useCase/member/packageAndPurchaseManagement/createMemberCheckoutUseCaseInterface";
import { IListPaymentUseCase } from "../../../application/interfaces/useCase/member/packageAndPurchaseManagement/listAllPaymentsUseCaseInterface";
import { IListPaymentsRequestDto } from "../../../application/dtos/memberDto/purchasePackageDto";
import { RevenueSuccess } from "../../shared/constants/messages/revenueMessages";

export class PackageListAndCheckoutController {
  constructor(
    private _listPackageUseCase: IListActivePackagesUseCase,
    private _createCheckoutUseCase: ICreateMemberCheckoutSessionUseCase,
    private _listAllPaymentUseCase: IListPaymentUseCase,
  ) {}
  async listPackages(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      const packages = await this._listPackageUseCase.execute(memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        PackageSuccessMessage.LISTED,
        packages,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleCheckout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { planId } = req.body;
      const { subdomain, id } = res.locals.data;
      const url = await this._createCheckoutUseCase.execute({
        planId,
        userId: id,
        subdomain,
      });
      ResponseHelper.success(HTTP_STATUS_CODE.OK, res, "send the Stripe url", {
        url,
      });
    } catch (error) {
      next(error);
    }
  }

  async listAllPayments(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: IListPaymentsRequestDto = {
        limit: Number(req.query.limit) || 5,
        page: Number(req.query.page) || 1,
        memberId: res.locals.data.id,
        search: String(req.query.search) || "",
        sourceType: req.query.sourceType ? String(req.query.sourceType) : "",
      };
      const response = await this._listAllPaymentUseCase.execute(params);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        RevenueSuccess.LISTED,
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
