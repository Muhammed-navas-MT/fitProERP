import { NextFunction, Request, Response } from "express";
import { IGenerateTrainerSalaryUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/generateTrainerSalaryUseCaseInterface";
import { IPayTrainerSalaryUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/payTrainerSalaryUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IListAllSalariesUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/listAllTrainerSalaryUseCaseInterface";
import {
  CreateSetupIntentDto,
  GetBillingConfigDto,
  ListTrainerSalaryRequestDto,
  SaveBillingEmailDto,
  SavePaymentMethodDto,
} from "../../../application/dtos/trainerDto/salaryDtos";
import { ICreateBillingSetupIntentUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/createBillingSetupIntentUseCaseInterface";
import { IGetBillingConfigUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/getBillingConfigUseCaseInterface";
import { ISaveBillingEmailUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/saveBillingEmailUseCaseInterface";
import { ISaveBillingPaymentMethodUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/saveBillingPaymentMethodUseCaseInterface";
import { IFindSalaryDetailUseCase } from "../../../application/interfaces/useCase/gymAdmin/salaryManagement/findSalaryDetailUseCaseInterface";

export class TrainerSalaryController {
  constructor(
    private _generateTrainerSalaryUseCase: IGenerateTrainerSalaryUseCase,
    private _listAllTrainerSalaryUseCase: IListAllSalariesUseCase,
    private _payTrainerSalaryUseCase: IPayTrainerSalaryUseCase,
    private _createBillingSetupIntentUseCase: ICreateBillingSetupIntentUseCase,
    private _getBillingConfigUseCaase: IGetBillingConfigUseCase,
    private _saveBillingEmailUseCase: ISaveBillingEmailUseCase,
    private _saveBillingPaymentMethodUseCase: ISaveBillingPaymentMethodUseCase,
    private _findSalaryDetailUseCase: IFindSalaryDetailUseCase,
  ) {}

  async handleGenerateSalary(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const gymId = res.locals.data.id;
      await this._generateTrainerSalaryUseCase.execute({ gymId });
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Trainer salary created successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async handleListAllSalary(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: ListTrainerSalaryRequestDto = {
        gymId: res.locals.data.id,
        limit: Number(req.query.limit) || 7,
        page: Number(req.query.page) || 1,
      };

      const response = await this._listAllTrainerSalaryUseCase.execute(params);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Trainer salary fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleCreateBillingSetupIntent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data: CreateSetupIntentDto = {
        gymId: res.locals.data.id,
      };

      const response =
        await this._createBillingSetupIntentUseCase.execute(data);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Billing setup intent created successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleGetBillingConfig(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data: GetBillingConfigDto = {
        gymId: res.locals.data.id,
      };

      const response = await this._getBillingConfigUseCaase.execute(data);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Billing config fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleSaveBillingEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { billingEmail } = req.body;

      const data: SaveBillingEmailDto = {
        billingEmail,
        gymId: res.locals.data.id,
      };

      const response = await this._saveBillingEmailUseCase.execute(data);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Billing email saved successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleSaveBillingPaymentMethod(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { billingEmail, paymentMethodId } = req.body;

      const data: SavePaymentMethodDto = {
        billingEmail,
        gymId: res.locals.data.id,
        paymentMethodId,
      };

      const response =
        await this._saveBillingPaymentMethodUseCase.execute(data);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Billing payment method saved successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  async handlePaySalary(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { salaryId } = req.params;
      const gymId = res.locals.data.id;

      const response = await this._payTrainerSalaryUseCase.execute({
        salaryId,
        gymId,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Trainer salary charge initiated successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  async handleFindSalaryDetail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { salaryId } = req.params;
      const response = await this._findSalaryDetailUseCase.execute(salaryId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Salary detail fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
