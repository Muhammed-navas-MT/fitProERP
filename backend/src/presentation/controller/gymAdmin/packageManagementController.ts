import { NextFunction, Request, Response } from "express";
import { IBlockPackageUseCase } from "../../../application/interfaces/useCase/gymAdmin/packageManagement/blockPackageUseCaseInterface";
import { ICreatePackageUseCase } from "../../../application/interfaces/useCase/gymAdmin/packageManagement/createPackageUseCaseInterface";
import { IListPackageUseCase } from "../../../application/interfaces/useCase/gymAdmin/packageManagement/listPackageUseCaseInterface";
import { IUnBlockPackageUseCase } from "../../../application/interfaces/useCase/gymAdmin/packageManagement/unBlockPackageUseCaseInterface";
import { IUpdatePakcageUseCase } from "../../../application/interfaces/useCase/gymAdmin/packageManagement/updatePackageUseCaseInterface";
import { IViewPackageUseCase } from "../../../application/interfaces/useCase/gymAdmin/packageManagement/viewPackageUseCaseInterface";
import { ICreatePackageRequestDTO, IListPackageRequestDTO, IUpdatePackageRequestDTO } from "../../../application/dtos/gymAdminDto/packageDto";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { PackageSuccessMessage } from "../../shared/constants/messages/packageMessages";
import { createPackageSchema } from "../../shared/validations/addPackageZodSchema";
import { updatePackageSchema } from "../../shared/validations/updatePackageZodSchema";

export class PackageController {
  constructor(
    private _blockPackageUseCase: IBlockPackageUseCase,
    private _createPackageUseCase: ICreatePackageUseCase,
    private _viewPackageUseCase: IViewPackageUseCase,
    private _listPackageUseCase: IListPackageUseCase,
    private _unBlockPackageUseCase: IUnBlockPackageUseCase,
    private _updatePackageUseCase: IUpdatePakcageUseCase
  ) {}

  async createPackage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const pkg: ICreatePackageRequestDTO = req.body;
      const validationError = createPackageSchema.safeParse(pkg);
      if(validationError.error){
        throw new InvalidDataException(validationError.error.issues[0].message);
      }
      const id = await this._createPackageUseCase.execute(pkg,res.locals.data.id);
      ResponseHelper.success(
        201,
        res,
        PackageSuccessMessage.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  async blockPackage(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {packageId} = req.params;
      await this._blockPackageUseCase.execute(packageId);
      ResponseHelper.success(
        200,
        res,
        PackageSuccessMessage.BLOCKED
      )
    } catch (error) {
      next(error)
    }
  }

  async unBlockPackage(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {packageId} = req.params;
      await this._unBlockPackageUseCase.execute(packageId);
      ResponseHelper.success(
        200,
        res,
        PackageSuccessMessage.UNBLOCKED
      )
    } catch (error) {
      next(error)
    }
  }

  async viewPackage(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {packageId} = req.params;
      const pkg = await this._viewPackageUseCase.execute(packageId);
      ResponseHelper.success(
        200,
        res,
        PackageSuccessMessage.FETCHED,
        pkg
      )
    } catch (error) {
      next(error)
    }
  }

  async updatePackage(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const pkg:IUpdatePackageRequestDTO = req.body;

      const validationError = updatePackageSchema.safeParse(pkg);
      if(validationError.error){
        throw new InvalidDataException(validationError.error.issues[0].message);
      }

      const {packageId} = req.params;
      await this._updatePackageUseCase.execute(pkg,packageId);
      ResponseHelper.success(
        200,
        res,
        PackageSuccessMessage.UPDATED
      )
    } catch (error) {

      next(error)
    }
  }

  async listAllPackage(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const params:IListPackageRequestDTO = {
        search:(req.query?.search as string) || "",
        limit:Number(req.query?.limit) || 5,
        page:Number(req.query?.page) || 1,
        branchId:(req.query?.search as string) || ""
      }

      const data = await this._listPackageUseCase.execute(params,res.locals.data.id);
      ResponseHelper.success(
        200,
        res,
        PackageSuccessMessage.LISTED,
        data
      )

    } catch (error) {
      next(error);
    }
  }
  
}
