import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { IReApplyUseCase } from "../../../application/interfaces/useCase/gymAdmin/reapplyAfterRejectionUseCaseInterface";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";
import cloudinary from "../../../config/cloudinary";
import { IReApplyDTO } from "../../../application/dtos/auth/gymAdminSignupDto";

export class ReApplyController {
  constructor(
    private _reApplyUseCase: IReApplyUseCase
  ) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
        const data:IReApplyDTO ={insuranceCertificate:"",businessLicense:"",email:req.body.email};
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (files?.businessLicense?.[0]) {
        const result = await cloudinary.uploader.upload(
          files.businessLicense[0].path,
          {
            folder: "gym_documents",
          }
        );
        data.businessLicense = result.secure_url;
      }

      if (files?.insuranceCertificate?.[0]) {
        const result = await cloudinary.uploader.upload(
          files.insuranceCertificate[0].path,
          {
            folder: "gym_documents",
          }
        );
        data.insuranceCertificate = result.secure_url;
      }

      await this._reApplyUseCase.execute(data);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_UPDATED
      );
    } catch (error) {
      next(error);
    }
  }
}
