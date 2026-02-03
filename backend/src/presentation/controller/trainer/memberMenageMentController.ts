import { Request,Response,NextFunction } from "express";
import { IAddMemberDTO } from "../../../application/dtos/auth/memberDto";
import { memberSignupSchema } from "../../shared/validations/addMemberZodSchema";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { MemberSuccess } from "../../shared/constants/errorMessage/memberMessage";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IListMemberRequestDTO } from "../../../application/dtos/memberDto/listAllMembersDto";
import { IListActiveTrainersUseCase } from "../../../application/interfaces/useCase/trainer/listAllActiveTrainerUseCaseInterface";
import { TrainerSuccess } from "../../shared/constants/errorMessage/trainerMessage";
import { ICreateMemberUseCase } from "../../../application/interfaces/useCase/trainer/memberManagement/createMemberUseCaseInterface";
import { IFindMemberUseCase } from "../../../application/interfaces/useCase/trainer/memberManagement/findMemberUseCaseInterface";
import { IUpdateMemberUseCase } from "../../../application/interfaces/useCase/trainer/memberManagement/updateMemberUseCaseInterface";
import { IUnBlockMemberUseCase } from "../../../application/interfaces/useCase/trainer/memberManagement/unblockMemberUseCaseInteface";
import { IBlockMemberUseCase } from "../../../application/interfaces/useCase/trainer/memberManagement/blockMemberUseCaseInterface";
import { IListMemberUseCase } from "../../../application/interfaces/useCase/trainer/memberManagement/listMemberUseCaseInterface";
import { IListActiveBranchUseCase } from "../../../application/interfaces/useCase/trainer/listActiveBranchUseCaseIterface";
import { BranchSuccess } from "../../shared/constants/messages/branchMessages";
import { IListActiveTrainersByBranchIdUseCase } from "../../../application/interfaces/useCase/trainer/memberManagement/listActiveTrainersByBranchIdUseCaseInterface";

export class MemberController {
    constructor(
        private _createMember:ICreateMemberUseCase,
        private _findMember:IFindMemberUseCase,
        private _updateMember:IUpdateMemberUseCase,
        private _unBlockMember:IUnBlockMemberUseCase,
        private _blockMember:IBlockMemberUseCase,
        private _listMember:IListMemberUseCase,
        private _listAllActiveTrainers:IListActiveTrainersUseCase,
        private _listActiveBranches:IListActiveBranchUseCase,
        private _listActiveTrainersByBranchId:IListActiveTrainersByBranchIdUseCase
    ){};

    async createMember(req:Request,res:Response,next:NextFunction):Promise<void> {
        try {
            const memberData:IAddMemberDTO = req.body;
            const zodValication = memberSignupSchema.safeParse(memberData);
            if(zodValication.error){
                throw new InvalidDataException(zodValication.error.issues[0].message);
            };

            const member = await this._createMember.createMember(zodValication.data);
            ResponseHelper.success(
                HTTP_STATUS_CODE.CREATE,
                res,
                MemberSuccess.MEMBER_CREATED,
                member
            )

        } catch (error) {
            next(error);
        }
    };

    async listAllMembers(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const params:IListMemberRequestDTO = {
                limit:Number(req.query?.limit) || 5,
                page:Number(req.query?.page) || 1,
                search:(req.query?.search as string) || "",
                trainerId:res.locals.data.id
            };
            const data = await this._listMember.listAllMembers(params);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                MemberSuccess.MEMBERS_LISTED,
                data
            )
        } catch (error) {
            next(error);
        }
    };
    async listAllActiveTrainers(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const trainers = await this._listAllActiveTrainers.listActiveTrainers(res.locals.data.id);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.TRAINERS_LISTED,
                trainers
            )
        } catch (error) {
            next(error)
        }
    }

  findMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberId = req.params.memberId as string
      const member = await this._findMember.findMember(memberId);
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
      const {trainerId,branchId} = req.body;
      const remove = await this._updateMember.updateMember({trainerId,branchId},req.params.memberId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        MemberSuccess.MEMBER_UPDATED,
        {remove}
      )
    } catch (error) {
      next(error);
    }
  };

  blockMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._blockMember.blockMember(req.params.memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        MemberSuccess.UPDATE_STATUS 
      )
    } catch (error) {
      next(error);
    }
  };
  
  unBlockMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await this._unBlockMember.unBlockMember(req.params.memberId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        MemberSuccess.UPDATE_STATUS,
        {status}
      )
    } catch (error) {
      next(error);
    }
  };

  async listAllActiveBranches(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const trainers = await this._listActiveBranches.listActiveBranch(res.locals.data.id);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                BranchSuccess.LISTED,
                trainers
            )
        } catch (error) {
            next(error)
        }
    }

  async listActiveTrainersByBranchId(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
            const branchId = req.query.branchId as string || ""
            const trainers = await this._listActiveTrainersByBranchId.listTrainers(branchId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                TrainerSuccess.TRAINERS_LISTED,
                trainers
            )
        } catch (error) {
            next(error);
        }
  }
}