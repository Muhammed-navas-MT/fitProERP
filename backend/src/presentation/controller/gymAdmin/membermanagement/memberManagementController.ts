import { Request, Response, NextFunction } from "express";
import { ICreateMemberUseCase } from "../../../../application/interfaces/useCase/gymAdmin/memberManagement/createMemberUseCaseInterface";
import { IListAllMemberUseCase } from "../../../../application/interfaces/useCase/gymAdmin/memberManagement/listMembersUseCaseInterface";
import { IFindMemberUseCase } from "../../../../application/interfaces/useCase/gymAdmin/memberManagement/findMemberUseCaseInterface";
import { IUpdateMemberUseCase } from "../../../../application/interfaces/useCase/gymAdmin/memberManagement/updateMemberUseCaseInterface";
import { IUnBlockMemberUseCase } from "../../../../application/interfaces/useCase/gymAdmin/memberManagement/unBlockMemberUseCaseInterface";
import { IBlockMemberUseCase } from "../../../../application/interfaces/useCase/gymAdmin/memberManagement/blockMemberUseCaseInterface";
import { ResponseHelper } from "../../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../../shared/constants/statusCode/statusCode";
import { MemberSuccess } from "../../../shared/constants/errorMessage/memberMessage";

export class MemberManagementController {
  constructor(
    private _createMemberUseCase: ICreateMemberUseCase,
    private _listAllMemberUseCase: IListAllMemberUseCase,
    private _findMemberUseCase: IFindMemberUseCase,
    private _updateMemberUseCase: IUpdateMemberUseCase,
    private _blockMemberUseCase: IBlockMemberUseCase,
    private _unBlockMemberUseCase: IUnBlockMemberUseCase
  ) {}

  createMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._createMemberUseCase.createMember(req.body);
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        MemberSuccess.MEMBER_CREATED
      )
    } catch (error) {
      next(error);
    }
  };

  listMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await this._listAllMemberUseCase.listAllMembers({
        ...req.query,
        gymId:res.locals.data.id
      } as any);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        MemberSuccess.MEMBERS_LISTED,
        members
      )
    } catch (error) {
      next(error);
    }
  };

  findMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberId = req.params.memberId as string
      const member = await this._findMemberUseCase.findMember(memberId);
     ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        MemberSuccess.MEMBER_FETCHED,
        member
      )
    } catch (error) {
      next(error);
    }
  };

  updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._updateMemberUseCase.updateMember(req.body,req.params.memberId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        MemberSuccess.MEMBER_UPDATED
      )
    } catch (error) {
      next(error);
    }
  };

  blockMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._blockMemberUseCase.blockMember(req.params.memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        MemberSuccess.MEMBER_UPDATED
      )
    } catch (error) {
      next(error);
    }
  };
  
  unBlockMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._unBlockMemberUseCase.unBlockMember(req.params.memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        MemberSuccess.MEMBER_CREATED
      )
    } catch (error) {
      next(error);
    }
  };
}
