import { NextFunction, Request, Response } from "express";
import { IGymAdminRepository } from "../../application/interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IBranchRepository } from "../../application/interfaces/repository/gymAdmin/branchRepoInterface";
import { IMemberRepository } from "../../application/interfaces/repository/member/addMemberRepoInterface";
import { ResponseHelper } from "../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../shared/constants/statusCode/statusCode";
import { MemberError } from "../shared/constants/errorMessage/memberMessage";
import { Status } from "../../domain/enums/status";
import { BranchStatus } from "../../domain/enums/branchStatus";

export class CheckMemberAccessMiddleWare {
    constructor(
        private _gymRepository: IGymAdminRepository,
        private _branchRepository: IBranchRepository,
        private _memberRepository: IMemberRepository
    ) {}

    execute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = res.locals.data;
            const member = await this._memberRepository.findById(id);
            if (!member) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.NOT_FOUND,
                    res,
                    MemberError.MEMBER_NOT_FOUND
                );
            }

            if (member.status !== Status.ACTIVE) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.FORBIDDEN,
                    res,
                    MemberError.MEMBER_BLOCKED
                );
            }

            const [branch, gym] = await Promise.all([
                member.branchId
                    ? this._branchRepository.findById(member.branchId)
                    : Promise.resolve(null),
                member.gymId
                    ? this._gymRepository.findById(member.gymId)
                    : Promise.resolve(null)
            ]);

            if (!branch || branch.status !== BranchStatus.ACTIVE) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.FORBIDDEN,
                    res,
                    MemberError.BRANCH_BLOCK
                );
            }

            if (!gym || gym.status !== Status.ACTIVE) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.FORBIDDEN,
                    res,
                    MemberError.GYM_NOT_ACTIVE
                );
            }
            next();
        } catch (error) {
            console.error("CheckMemberAccessMiddleware error:", error);
            return ResponseHelper.error(
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
                res,
                "Something went wrong in access check"
            );
        }
    };
}
