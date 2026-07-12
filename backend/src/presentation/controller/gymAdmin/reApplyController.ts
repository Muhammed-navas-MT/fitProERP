import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { IReApplyUseCase } from "../../../application/interfaces/useCase/gymAdmin/reapplyAfterRejectionUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";
import { IReApplyDTO } from "../../../application/dtos/auth/gymAdminSignupDto";

export class ReApplyController {
  constructor(private _reApplyUseCase: IReApplyUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IReApplyDTO = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      await this._reApplyUseCase.execute({
        ...data,
        businessLicense: files?.businessLicense?.[0],
        insuranceCertificate: files?.insuranceCertificate?.[0],
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_UPDATED,
      );
    } catch (error) {
      next(error);
    }
  }
}
