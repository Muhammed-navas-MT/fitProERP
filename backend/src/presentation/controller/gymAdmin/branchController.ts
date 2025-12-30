import { Request, Response, NextFunction } from "express";
import { IBlockBranchUseCase } from "../../../application/interfaces/useCase/gymAdmin/branch/blockBranchUseCaseInterface";
import { ICreateBranchUseCase } from "../../../application/interfaces/useCase/gymAdmin/branch/createBranchUseCaseInterface";
import { IFindBranchUseCase } from "../../../application/interfaces/useCase/gymAdmin/branch/findBranchUseCaseInterface";
import { IListBranchUseCase } from "../../../application/interfaces/useCase/gymAdmin/branch/listBranchUseCaseInterface";
import { IUnBlockBranchUseCase } from "../../../application/interfaces/useCase/gymAdmin/branch/unBlockBranchUseCaseInterface";
import { IUpdateBranchUseCase } from "../../../application/interfaces/useCase/gymAdmin/branch/updateBranchUseCaseInterface";
import { BranchSchema } from "../../shared/validations/branchValidationZodSchema";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { BranchSuccess } from "../../shared/constants/messages/branchMessages";

export class BranchController {
  constructor(
    private readonly _createBranchUseCase: ICreateBranchUseCase,
    private readonly _listBranchUseCase: IListBranchUseCase,
    private readonly _findBranchUseCase: IFindBranchUseCase,
    private readonly _unBlockBranchUseCase: IUnBlockBranchUseCase,
    private readonly _blockBranchUseCase: IBlockBranchUseCase,
    private readonly _updateBranchUseCase: IUpdateBranchUseCase
  ) {}

  createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const zodValidation = BranchSchema.safeParse({...req.body,gymId:res.locals.data.id});
      if (!zodValidation.success) {
        throw new InvalidDataException(
          zodValidation.error.issues[0].message
        );
      };
      await this._createBranchUseCase.createBranch({...req.body,gymId:res.locals.data.id});

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        BranchSuccess.CREATED,
      );
    } catch (error) {
      next(error);
    }
  };

  listBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this._listBranchUseCase.listBranch({
        gymId:res.locals.data.id,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search as string,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        BranchSuccess.LISTED,
        result
      );

    } catch (error) {
      next(error);
    }
  };

  findBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const branch = await this._findBranchUseCase.findBranch(
        req.params.branchId
      );

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        BranchSuccess.FOUND,
        branch
      );
    } catch (error) {
      next(error);
    }
  };

  updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const zodValidation = BranchSchema.safeParse(req.body);
      if (!zodValidation.success) {
        throw new InvalidDataException(
          zodValidation.error.issues[0].message
        );
      };
      await this._updateBranchUseCase.updateBranch(
        req.body,
        req.params.branchId
      );

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        BranchSuccess.UPDATED,
      );
    } catch (error) {
      next(error);
    }
  };

  blockBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this._blockBranchUseCase.blockBranch(req.params.branchId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        BranchSuccess.BLOCKED,
      );
    } catch (error) {
      next(error);
    }
  };

  unBlockBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this._unBlockBranchUseCase.unBlockBranch(req.params.branchId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        BranchSuccess.UNBLOCKED,
      );
    } catch (error) {
      next(error);
    }
  };
}
