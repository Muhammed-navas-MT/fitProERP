import { NextFunction, Request, Response } from "express";
import { IGetTrainerSalaryConfigUseCase } from "../../../application/interfaces/useCase/trainer/salaryManagement/getTrainerSalaryConfigUseCaseInterface";
import { IUpdateTrainerSalaryConfigUseCase } from "../../../application/interfaces/useCase/trainer/salaryManagement/updateTrainerSalaryConfigUseCaseInterface";
import { ICreateTrainerStripeOnboardingLinkUseCase } from "../../../application/interfaces/useCase/trainer/salaryManagement/createTrainerStripeOnboardingLinkUseCaseInterface";
import { IRefreshTrainerStripeStatusUseCase } from "../../../application/interfaces/useCase/trainer/salaryManagement/refreshTrainerStripeStatusUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { CreateTrainerOnboardingLinkDto } from "../../../application/dtos/trainerDto/trainerSalaryConfigDto";
import { IViewSalaryUseCase } from "../../../application/interfaces/useCase/trainer/salaryManagement/viewSalaryUseCaseInterface";
import { IListAllSalaryUseCase } from "../../../application/interfaces/useCase/trainer/salaryManagement/listAllSalaryUseCaseInterface";

export class TrainerSalaryConfigController {
  constructor(
    private _getTrainerSalaryConfigUseCase: IGetTrainerSalaryConfigUseCase,
    private _updateTrainerSalaryConfigUseCase: IUpdateTrainerSalaryConfigUseCase,
    private _createTrainerStripeOnboardingLinkUseCase: ICreateTrainerStripeOnboardingLinkUseCase,
    private _refreshTrainerStripeStatusUseCase: IRefreshTrainerStripeStatusUseCase,
    private _viewSalaryUseCase: IViewSalaryUseCase,
    private _listAllSalaryUseCase: IListAllSalaryUseCase,
  ) {}

  async getSalaryConfig(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const trainerId = res.locals.data.id;
      const response =
        await this._getTrainerSalaryConfigUseCase.execute(trainerId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Salary config fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
  async updateSalaryConfig(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const trainerId = res.locals.data.id;
      const { paymentType, accountHolderName, ifscCode, upiId } = req.body;
      const response = await this._updateTrainerSalaryConfigUseCase.execute({
        trainerId,
        paymentType,
        accountHolderName,
        ifscCode,
        upiId,
      });
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Salary config updated successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
  async createStripeOnboardingLink(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { returnUrl, refreshUrl } = req.body;
      const data: CreateTrainerOnboardingLinkDto = {
        refreshUrl,
        returnUrl,
        trainerId: res.locals.data.id,
      };
      const response =
        await this._createTrainerStripeOnboardingLinkUseCase.execute(data);
      console.log(response);
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Stripe onboarding link created successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
  async refreshStripeStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const trainerId = res.locals.data.id;
      const response = await this._refreshTrainerStripeStatusUseCase.execute({
        trainerId,
      });
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Stripe account status fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
  async viewSalary(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { salaryId } = req.params;
      const response = await this._viewSalaryUseCase.execute(salaryId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Salary details fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
  async listAllSalary(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const trainerId = res.locals.data.id;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      const response = await this._listAllSalaryUseCase.execute(
        trainerId,
        page,
        limit,
      );
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Salary details fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
