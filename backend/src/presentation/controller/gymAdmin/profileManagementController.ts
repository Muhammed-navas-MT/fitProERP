import { NextFunction, Request, Response } from "express";
import { IViewGymAdminProfileUseCase } from "../../../application/interfaces/useCase/gymAdmin/profileManagement/viewGymadminProfileUseCaseInterface";
import { IUpdateGymAdminProfileUseCase } from "../../../application/interfaces/useCase/gymAdmin/profileManagement/updateGymAdminProfileUseCaseInterface";
import { IChangeGymAdminPasswordUseCase } from "../../../application/interfaces/useCase/gymAdmin/profileManagement/changeGymAdminPasswordUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { GymAdminAuthSuccess } from "../../shared/constants/successMessage/gymAdminAuthSuccess";
import { UpdateGymAdminProfileRequestDTO } from "../../../application/dtos/gymAdminDto/gymAdminProfileDtos";
import { updateGymAdminProfileSchema } from "../../shared/validations/updateGymAdminProfileSchema";
import { BadRequestException } from "../../../application/constants/exceptions";
import { changePasswordSchema } from "../../shared/validations/passwordZodSchema";
import { GymAdminAuthError } from "../../shared/constants/errorMessage/gymAdminAuthError";
import cloudinary from "../../../config/cloudinary";

export class GymAdminProfileController {
  constructor(
    private _viewProfileUseCase: IViewGymAdminProfileUseCase,
    private _updateProfileUseCase: IUpdateGymAdminProfileUseCase,
    private _changePasswordUseCase: IChangeGymAdminPasswordUseCase
  ) {}

  async viewProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const gymAdminId = res.locals.data.id;
      const profile = await this._viewProfileUseCase.execute(gymAdminId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_DETAIL,
        profile
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProfile( req: Request,res: Response, next: NextFunction ): Promise<void> {
    try {
      const gymAdminId = res.locals.data.id;

      const file = req.file;
      let logoUrl: string | undefined;

      if (file) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "gym_logos",
          resource_type: "image",
          transformation: [
            { width: 300, height: 300, crop: "fill", gravity: "face" },
          ],
        });

        logoUrl = uploadResult.secure_url;
      }
      const data: UpdateGymAdminProfileRequestDTO = req.body;
      const validation = updateGymAdminProfileSchema.safeParse({
        ...data,
        ...(logoUrl && { logo: logoUrl }),
      });

      if (!validation.success) {
        throw new BadRequestException(validation.error.issues[0].message);
      }
      const profile = await this._updateProfileUseCase.execute(
        {
          ...data,
          ...(logoUrl && { logo: logoUrl }),
        },
        gymAdminId
      );

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        GymAdminAuthSuccess.GYM_UPDATED,
        profile
      );
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const gymAdminId = res.locals.data.id;
      const data = req.body;
      const validation = changePasswordSchema.safeParse({
        newPassword: data.newPassword,
      });
      if (!validation.success) {
        throw new BadRequestException(validation.error.issues[0].message);
      }
      await this._changePasswordUseCase.execute({ ...data, gymAdminId });
      ResponseHelper.success(
        HTTP_STATUS_CODE.NO_CONTENT,
        res,
        GymAdminAuthSuccess.PASSWORD_CHANGED
      );
    } catch (error) {
      next(error);
    }
  }
}
