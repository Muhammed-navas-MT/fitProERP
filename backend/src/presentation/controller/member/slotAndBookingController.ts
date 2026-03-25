import { NextFunction, Request, Response } from "express";
import { IListAllAvailableSlotUseCase } from "../../../application/interfaces/useCase/member/slotAndBookingManagement/listAllAvailableSlotUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { ICreateMemberSessionCheckoutSessionUseCase } from "../../../application/interfaces/useCase/member/slotAndBookingManagement/createMemberSessionCheckoutSessionUseCaseInterface";
import { SlotAndBookingSuccess } from "../../shared/constants/messages/slotAndBookingMessages";
import { StripeSuccess } from "../../shared/constants/messages/stripeMessages";
import { IListAllSessionsUseCase } from "../../../application/interfaces/useCase/member/slotAndBookingManagement/listAllSessionsUseCaseInterface";
import { ListAllSessionsRequestDto } from "../../../application/dtos/memberDto/slotAndBookingDto";

export class SlotAndBookingController {
  constructor(
    private _listAvailableSlotUseCase: IListAllAvailableSlotUseCase,
    private _createMemberSessionCheckoutUseCase: ICreateMemberSessionCheckoutSessionUseCase,
    private _listAllSessionsUseCase: IListAllSessionsUseCase,
  ) {}
  async handleListAvailableSlot(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const memberId = res.locals.data.id;
      const trainerId = req.query.trainerId ? String(req.query.trainerId) : "";
      const data = await this._listAvailableSlotUseCase.execute({
        memberId,
        trainerId,
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        SlotAndBookingSuccess.LISTED,
        data,
      );
    } catch (error) {
      next(error);
    }
  }
  async handleCheckout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;
      const userId = res.locals.data.id;
      const subdomain = res.locals.data.subdomain;
      const url = await this._createMemberSessionCheckoutUseCase.execute({
        ...data,
        amount: Number(data.amount),
        userId,
        subdomain,
      });
      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        StripeSuccess.STRIPE_URL,
        { url },
      );
    } catch (error) {
      next(error);
    }
  }

  async handleListAllSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: ListAllSessionsRequestDto = {
        limit: Number(req.query.limit) || 5,
        page: Number(req.query.page) || 1,
        memberId: res.locals.data.id,
      };
      const response = await this._listAllSessionsUseCase.execute(params);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        SlotAndBookingSuccess.LISTED_SESSION,
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
