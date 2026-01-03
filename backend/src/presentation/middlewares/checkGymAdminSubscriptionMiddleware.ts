import { Request, Response, NextFunction } from "express";
import { ResponseHelper } from "../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../shared/constants/statusCode/statusCode";
import { IGymAdminRepository } from "../../application/interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { GymAdminAuthError } from "../shared/constants/errorMessage/gymAdminAuthError";

export class CheckGymAdminSubscriptionMiddleware {
    constructor(private _gymAdminRepository: IGymAdminRepository) {}

    execute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = res.locals.data;
            const gymAdmin = await this._gymAdminRepository.findById(id);
            if (!gymAdmin) return ResponseHelper.error(HTTP_STATUS_CODE.NOT_FOUND, res,GymAdminAuthError.GYM_NOT_FOUND);

            const now = new Date();
            if (gymAdmin.subscriptionEnd && new Date(gymAdmin.subscriptionEnd) < now) {
                return ResponseHelper.error(
                    HTTP_STATUS_CODE.FORBIDDEN,
                    res,
                    GymAdminAuthError.SUBSCRIPTION_END
                );
            }
            next();
        } catch (error) {
            console.error("CheckGymAdminSubscriptionMiddleware error:", error);
            return ResponseHelper.error(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, res, "Something went wrong");
        }
    };
}
