import { Request,Response,NextFunction } from "express";
import { IAddMemberUseCase } from "../../../application/interfaces/useCase/trainer/addMemberUseCaseInterface";
import { IAddMemberDTO } from "../../../application/dtos/auth/memberDto";
import { memberSignupSchema } from "../../shared/validations/addMemberZodSchema";
import { InvalidDataException } from "../../../application/constants/exceptions";
import { MemberSuccess } from "../../shared/constants/errorMessage/memberMessage";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IListMemberRequestDTO } from "../../../application/dtos/memberDto/listAllMembersDto";
import { IListActiveTrainersUseCase } from "../../../application/interfaces/useCase/trainer/listAllActiveTrainerUseCaseInterface";
import { TrainerSuccess } from "../../shared/constants/errorMessage/trainerMessage";

export class AddMemberController {
    private _addMemberUseCase:IAddMemberUseCase;

    constructor(
        addMemberUseCase:IAddMemberUseCase,
        private _listAllActiveTrainers:IListActiveTrainersUseCase
    ){
        this._addMemberUseCase = addMemberUseCase
    };

    async addMember(req:Request,res:Response,next:NextFunction):Promise<void> {
        try {
            const memberData:IAddMemberDTO = req.body;

            const zodValication = memberSignupSchema.safeParse(memberData);
            if(zodValication.error){
                throw new InvalidDataException(zodValication.error.issues[0].message);
            };

            await this._addMemberUseCase.signUp(zodValication.data);
            ResponseHelper.success(
                HTTP_STATUS_CODE.CREATE,
                res,
                MemberSuccess.MEMBER_CREATED,
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
                trainerId:(req.query.trainerId as string)
            };
            const data = await this._addMemberUseCase.listAllTrainers(params);
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
            console.log(res.locals.data.id,"sdfasdfsadf")
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
}