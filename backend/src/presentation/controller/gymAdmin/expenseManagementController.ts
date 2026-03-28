import { NextFunction, Request, Response } from "express";
import { IFindExpeUseCase } from "../../../application/interfaces/useCase/gymAdmin/expenseManagement/findExpenseUseCaseInterface";
import { IFindExpenseDetailUseCase } from "../../../application/interfaces/useCase/gymAdmin/expenseManagement/findExpenseDetailUseCaseInterface";
import { IListAllExpenseUseCase } from "../../../application/interfaces/useCase/gymAdmin/expenseManagement/listAllExpensesUseCaseInterface";
import { ICreateExpenseUseCase } from "../../../application/interfaces/useCase/gymAdmin/expenseManagement/createExpenseUseCaseInterface";
import {
  ICreateExpenseRequestDto,
  IListExpenseRequestDto,
  IUpdateExpenseRequestDto,
} from "../../../application/dtos/gymAdminDto/expenseDtos";
import {
  ExpenseSchema,
  ExpenseUpdateSchema,
} from "../../shared/validations/expenseValidationZodSchema";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { ExpenseSuccess } from "../../shared/constants/messages/expensemessages";
import { ExpencseCreateModel } from "../../../domain/enums/expenseCreateModel";
import { IUpdateExpenseUseCase } from "../../../application/interfaces/useCase/gymAdmin/expenseManagement/updateExpenseUseCaseInterface";

export class GymAdminExpenseController {
  constructor(
    private _createExpenseUseCase: ICreateExpenseUseCase,
    private _findExpenseUseCase: IFindExpeUseCase,
    private _findExpenseDetailUseCase: IFindExpenseDetailUseCase,
    private _listAllExpenseUseCase: IListAllExpenseUseCase,
    private _updateExpenseUseCase: IUpdateExpenseUseCase,
  ) {}

  async createExpense(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const expense: ICreateExpenseRequestDto = req.body;

      const validationResult = ExpenseSchema.safeParse({
        ...expense,
        createdBy: res.locals.data.id,
        createdByModel: ExpencseCreateModel.GYMADMIN,
      });

      if (validationResult.error) {
        throw new InvalidDataException(
          validationResult.error.issues[0].message,
        );
      }
      const gymAdminId = res.locals.data.id;
      await this._createExpenseUseCase.execute(
        validationResult.data,
        gymAdminId,
      );

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        ExpenseSuccess.CREATED,
      );
    } catch (error) {
      next(error);
    }
  }

  async listAllExpense(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: IListExpenseRequestDto = {
        expenseType: req.query.expenseType ? String(req.query.expenseType) : "",
        gymId: res.locals.data.id,
        limit: Number(req.query.limit) || 5,
        page: Number(req.query.page) || 1,
        search: String(req.query.search) || "",
      };

      const expenses = await this._listAllExpenseUseCase.execute(params);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        ExpenseSuccess.LISTED,
        expenses,
      );
    } catch (error) {
      next(error);
    }
  }

  async findExpenseDetail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { expenseId } = req.params;
      const expense = await this._findExpenseDetailUseCase.execute(expenseId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        ExpenseSuccess.FOUND,
        expense,
      );
    } catch (error) {
      next(error);
    }
  }

  async findExpense(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { expenseId } = req.params;
      const expense = await this._findExpenseUseCase.execute(expenseId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        ExpenseSuccess.FOUND,
        expense,
      );
    } catch (error) {
      next(error);
    }
  }

  async updateExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IUpdateExpenseRequestDto = req.body;
      const { expenseId } = req.params;

      const validationResult = ExpenseUpdateSchema.safeParse(data);
      if (validationResult.error) {
        throw new InvalidDataException(
          validationResult.error.issues[0].message,
        );
      }
      await this._updateExpenseUseCase.execute(
        validationResult.data,
        expenseId,
      );
      ResponseHelper.success(HTTP_STATUS_CODE.OK, res, ExpenseSuccess.UPDATED);
    } catch (error) {
      next(error);
    }
  }
}
