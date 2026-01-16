import { NextFunction, Request, Response } from "express";
import { Roles } from "../../../domain/enums/roles";
import { AttendanceUserType } from "../../../domain/enums/attendanceUserType";
import { IMarkAttendanceUseCase } from "../../../application/interfaces/useCase/shared/attendanceManagement/markAttendanceUseCaseInterface";
import { IUpdateAttendceUseCase } from "../../../application/interfaces/useCase/shared/attendanceManagement/updateAttendanceUseCaseInterfance";
import { IGetAttendanceUseCase } from "../../../application/interfaces/useCase/shared/attendanceManagement/getAttendanceUseCaseInterface";
import { IGetAttendanceListUseCase } from "../../../application/interfaces/useCase/shared/attendanceManagement/getAttendanceListUseCaseInterface";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { ListAttendanceRequestDto } from "../../../application/dtos/shared/markAttendanceDTO";
import { IGetCurrentMonthAttendanceUseCase } from "../../../application/interfaces/useCase/shared/attendanceManagement/getCurrentMonthAttendanceUseCaseInterface";
import { attendanceMessage } from "../../shared/constants/messages/attendanceMessages";

export class AttendanceController {
  constructor(
    private _markAttendanceUseCase: IMarkAttendanceUseCase,
    private _updateAttendanceUseCase: IUpdateAttendceUseCase,
    private _getAttendanceUseCase: IGetAttendanceUseCase,
    private _getAttendanceListUseCase: IGetAttendanceListUseCase,
    private _getCurrentMonthAttendanceUseCase:IGetCurrentMonthAttendanceUseCase
  ) {}

  markAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userType =
        res?.locals?.data?.role === Roles.TRAINER
          ? AttendanceUserType.TRAINER
          : AttendanceUserType.MEMBER;

      await this._markAttendanceUseCase.execute({
        userId: res.locals.data.id,
        userType,
        date: new Date(),
      });

      ResponseHelper.success(
        HTTP_STATUS_CODE.CREATE,
        res,
        "Attendance marked successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  updateAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      await this._updateAttendanceUseCase.execute(id);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Attendance updated successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  getAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const date = new Date();
      const attendance = await this._getAttendanceUseCase.execute(res.locals.data.id,date);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Attendance fetched successfully",
        attendance
      );
    } catch (error) {
      next(error);
    }
  };

  getAttendanceList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: ListAttendanceRequestDto = {
        userId: req.query.userId as string,
        trainerId: req.query.trainerId as string,
        branchId: req.query.branchId as string,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 5,
      };

      const result = await this._getAttendanceListUseCase.execute(params);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Attendance list fetched successfully",
        result
      );
    } catch (error) {
      next(error);
    }
  };

  getCurrentMonthAttendance = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const userId = res.locals.data.id;
      const userType =
        res?.locals?.data?.role === Roles.TRAINER
          ? AttendanceUserType.TRAINER
          : AttendanceUserType.MEMBER;
          
      const attendances = await this._getCurrentMonthAttendanceUseCase.execute(userId,userType);

      ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        attendanceMessage.FETCH_ALL_SUCCESS,
        attendances
      )
    } catch (error) {
      next(error);
    }
  }
}
