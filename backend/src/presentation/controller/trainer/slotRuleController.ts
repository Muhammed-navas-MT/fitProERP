import { NextFunction, Request, Response } from "express";
import { ICreateSlotRuleUseCase } from "../../../application/interfaces/useCase/trainer/slotRuleManagement/createSlotRuleUseCaseInterface";
import { CreateSlotRuleRequestDTO } from "../../../application/dtos/trainerDto/slotRuleDtos";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class SlotRuleController {
  constructor(private _createSlotRuleUseCase: ICreateSlotRuleUseCase) {}
  async handleCreateslotRule(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data: CreateSlotRuleRequestDTO = req.body;
      const trainerId = res.locals.data.id;

      await this._createSlotRuleUseCase.execute({ ...data, trainerId });

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Slot rule created successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}
