import { NextFunction, Request, Response } from "express";
import { IListPaymentRequestDTO } from "../../../application/dtos/superAdminDto/paymentDto";
import { IListPaymentsUseCase } from "../../../application/interfaces/useCase/superAdmin/paymentManagement/listPaymentsUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { PaymentSuccess } from "../../shared/constants/messages/paymentMessages";
import { IFindPaymentUseCase } from "../../../application/interfaces/useCase/superAdmin/paymentManagement/findPaymentUseCaseInterfance";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";

export class PaymentController{
    constructor(
        private _listAllPayments:IListPaymentsUseCase,
        private _findPayment:IFindPaymentUseCase
    ){};
    async listAllPayments(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const params:IListPaymentRequestDTO = {
                limit:Number(req.query.limit)||5,
                page:Number(req.query.page)||1,
                search:String(req.query.search)||""
            };
            const data = await this._listAllPayments.listPayments(params);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                PaymentSuccess.LISTED,
                data
            )
        } catch (error) {
            next(error);
        }
    };

    async findPayment(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {paymentId} = req.params;
            const data = await this._findPayment.execute(paymentId);
            ResponseHelper.success(
                HTTP_STATUS_CODE.OK,
                res,
                PaymentSuccess.FOUND,
                data
            )
        } catch (error) {
            next(error)
        }
    }
}