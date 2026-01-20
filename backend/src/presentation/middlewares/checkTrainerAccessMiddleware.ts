import { NextFunction, Request, Response } from "express";
import { IGymAdminRepository } from "../../application/interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IBranchRepository } from "../../application/interfaces/repository/gymAdmin/branchRepoInterface";
import { ResponseHelper } from "../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../shared/constants/statusCode/statusCode";
import { Status } from "../../domain/enums/status";
import { BranchStatus } from "../../domain/enums/branchStatus";
import { ITrainerRepository } from "../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { TrainerError } from "../shared/constants/errorMessage/trainerMessage";

export class CheckTrainerAccessMiddleWare {
    constructor(
        private _gymRepository: IGymAdminRepository,
        private _branchRepository: IBranchRepository,
        private _trainerRepository: ITrainerRepository
    ) {}

    execute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = res.locals.data;

            const trainer = await this._trainerRepository.findById(id);
            if (!trainer) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.NOT_FOUND,
                    res,
                    TrainerError.TRAINER_NOT_FOUND
                );
            }

            if (trainer.status !== Status.ACTIVE) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.FORBIDDEN,
                    res,
                    TrainerError.ACCOUNT_BLOCKED
                );
            }

            const [branch, gym] = await Promise.all([
                trainer.branchId
                    ? this._branchRepository.findById(trainer.branchId)
                    : Promise.resolve(null),
                trainer.gymId
                    ? this._gymRepository.findById(trainer.gymId)
                    : Promise.resolve(null)
            ]);

            if (!branch || branch.status !== BranchStatus.ACTIVE) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.FORBIDDEN,
                    res,
                    TrainerError.BRANCH_BLOCK
                );
            }

            if (!gym || gym.status !== Status.ACTIVE) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.FORBIDDEN,
                    res,
                    TrainerError.GYM_NOT_ACTIVE
                );
            }
            next();
        } catch (error) {
            console.error("CheckTrainerAccessMiddleware error:", error);
            return ResponseHelper.error(
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
                res,
                "Something went wrong in access check"
            );
        }
    };
}
