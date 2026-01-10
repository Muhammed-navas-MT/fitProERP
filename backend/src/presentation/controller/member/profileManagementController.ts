import { NextFunction, Request, Response } from "express";
import { IViewProfileUseCase } from "../../../application/interfaces/useCase/member/profileManagement/viewProfileUseCaseInterface";
import { IUpdateProfileUseCase } from "../../../application/interfaces/useCase/member/profileManagement/updateProfileUseCaseInterface";
import { IUploadProfileImageUseCase } from "../../../application/interfaces/useCase/member/profileManagement/uploadProfilePictureUseCaseInterface";
import { IDeleteProfilePictureUseCase } from "../../../application/interfaces/useCase/member/profileManagement/deleteProfilePictureUseCaseInterface";
import { IChangePasswordUseCase } from "../../../application/interfaces/useCase/member/profileManagement/changePasswordUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { MemberError, MemberSuccess } from "../../shared/constants/errorMessage/memberMessage";
import { UpdateMemberProfileDTO } from "../../../application/dtos/memberDto/profileManagementDtos";
import { UpdateMemberProfileSchema } from "../../shared/validations/memberProfileUpdateSchema";
import { BadRequestException } from "../../../application/constants/exceptions";
import cloudinary from "../../../config/cloudinary";

export class ProfileController {
  constructor(
    private _viewProfileUseCase: IViewProfileUseCase,
    private _updateProfileUseCase: IUpdateProfileUseCase,
    private _uploadProfilePicture: IUploadProfileImageUseCase,
    private _deleteProfilePicture: IDeleteProfilePictureUseCase,
    private _changePassword: IChangePasswordUseCase
  ) {}

  async viewMemberProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const member = await this._viewProfileUseCase.execute(res.locals.data.id);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        MemberSuccess.MEMBER_FETCHED,
        member
      );
    } catch (error) {
      next(error);
    }
  }

  async changePassword( req: Request, res: Response, next: NextFunction ): Promise<void>{
    try {
        const {newPassword,oldPassword} = req.body;
        await this._changePassword.execute({newPassword,oldPassword,memberId:res.locals.data.id});
        ResponseHelper.success(
            HTTP_STATUS_CODE.NO_CONTENT,
            res,
            MemberSuccess.PASSWORD_CHANGED
        )
    } catch (error) {
        next(error)
    }
  }

  async updateProfile(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
        const member:UpdateMemberProfileDTO = req.body;
        const memberId = res.locals.data.id;
        const validation = UpdateMemberProfileSchema.safeParse(member);
        if(!validation.success){
            throw new BadRequestException(validation.error.issues[0].message);
        }
        await this._updateProfileUseCase.execute(validation.data,memberId)
        ResponseHelper.success(
            HTTP_STATUS_CODE.NO_CONTENT,
            res,
            MemberSuccess.PROFILE_UPDATED
        )
    } catch (error) {
        next(error)
    }
  }

  async uploadProfilePicture(req: Request, res: Response, next: NextFunction) {
  try {
    const memberId = res.locals.data.id
    const file = req.file
    if (!file) {
      throw new BadRequestException(MemberError.PROFILE_IMG_REQUIRED)
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "profile-pictures",
      resource_type: "image",
      transformation: [
        { width: 300, height: 300, crop: "fill", gravity: "face" }
      ],
    })

    const image = await this._uploadProfilePicture.execute(
      memberId,
      uploadResult.secure_url
    )

    ResponseHelper.success(
      HTTP_STATUS_CODE.OK,
      res,
      MemberSuccess.PROFILE_PICTURE_UPDATED,
      image
    )
  } catch (error) {
    next(error)
  }
}

  async deleteProfilePicture(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
        await this._deleteProfilePicture.execute(res.locals.data.id);
        ResponseHelper.success(
            HTTP_STATUS_CODE.NO_CONTENT,
            res,
            MemberSuccess.PROFILE_PICTURE_DELETED
        )
    } catch (error) {
        next(error)
    }
  }

}
