import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODE } from "../shared/constants/statusCode/statusCode";
import { ResponseHelper } from "../shared/utils/responseHelper";

import {
  ApplicationException,
  NOtFoundException as NotFoundException,
  AlreadyExistException,
  UpdateFailedException,
  InvalidDataException,
  InvalidIdException,
  InvalidOtpException,
  OtpExpiredException,
  ForbiddenException,
  TokenMissingException,
  BadRequestException,
  RegistrationExpiredException,
  TokenExpiredException,
} from "../../application/constants/exceptions";

export const errorHandleMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";

  if (err instanceof ApplicationException) {
    message = err.message;

    if (err instanceof NotFoundException) {
      statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    } else if (err instanceof AlreadyExistException) {
      statusCode = HTTP_STATUS_CODE.CONFLICT;
    } else if (
      err instanceof BadRequestException ||
      err instanceof InvalidDataException ||
      err instanceof InvalidIdException ||
      err instanceof UpdateFailedException
    ) {
      statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
    } else if (
      err instanceof TokenExpiredException ||
      err instanceof TokenMissingException
    ) {
      statusCode = HTTP_STATUS_CODE.UNAUTHORIZED;
    } else if (err instanceof ForbiddenException) {
      statusCode = HTTP_STATUS_CODE.FORBIDDEN;
    } else if (
      err instanceof InvalidOtpException ||
      err instanceof OtpExpiredException ||
      err instanceof RegistrationExpiredException
    ) {
      statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
    }
  } else if (err instanceof Error) {
    message = err.message;
  }

  return ResponseHelper.error(statusCode, res, message);
};
