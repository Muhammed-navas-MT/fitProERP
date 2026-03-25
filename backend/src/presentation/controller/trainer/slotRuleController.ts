import { NextFunction, Request, Response } from "express";
import { ICreateSlotRuleUseCase } from "../../../application/interfaces/useCase/trainer/slotRuleManagement/createSlotRuleUseCaseInterface";
import {
  CreateSlotRuleRequestDTO,
  UpdateSlotRuleRequestDto,
} from "../../../application/dtos/trainerDto/slotRuleDtos";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IFindSlotRuleUseCase } from "../../../application/interfaces/useCase/trainer/slotRuleManagement/findSlotRuleUseCaseInterface";
import { IUpdateSlotRuleUseCase } from "../../../application/interfaces/useCase/trainer/slotRuleManagement/updateSlotRuleUseCaseInterface";
import { IListAllSlotUseCase } from "../../../application/interfaces/useCase/trainer/slotRuleManagement/listAllSlotUseCaseInterface";

export class SlotRuleController {
  constructor(
    private _createSlotRuleUseCase: ICreateSlotRuleUseCase,
    private _findSlotRuleUseCase: IFindSlotRuleUseCase,
    private _updateSlotRuleUseCase: IUpdateSlotRuleUseCase,
    private _listAllSlotUseCase: IListAllSlotUseCase,
  ) {}
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
  async handleFindSlotRule(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const trainerId = res.locals.data.id;
      const response = await this._findSlotRuleUseCase.execute(trainerId);
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Slot rule fetched successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
  async handleUpdateSlotRule(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data: UpdateSlotRuleRequestDto = req.body;
      const { slotRuleId } = req.params;

      await this._updateSlotRuleUseCase.execute(data, slotRuleId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Slot rule updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }
  async handleListSlot(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const trainerId = res.locals.data.id;
      const response = await this._listAllSlotUseCase.execute(trainerId);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Slot listed successfully",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
