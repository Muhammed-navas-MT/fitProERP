import id from "zod/v4/locales/id.js";
import { ForbiddenException, NOtFoundException } from "../../../application/constants/exceptions";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { AttendanceRule } from "../../../application/interfaces/service/attendanceRule";
import { AttendanceEntity } from "../../../domain/entities/shared/attendanceEntity";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { attendanceMessage } from "../../../presentation/shared/constants/messages/attendanceMessages";

export class TrainerCheckOutAttendanceRule implements AttendanceRule {
  constructor(private _trainerRepository: ITrainerRepository) {}

  async validate(attendance: AttendanceEntity): Promise<string> {

    if (!attendance.userId) {
  throw new Error("attendance.userId is missing");
  }
    
    const trainer = await this._trainerRepository.findById(attendance.userId);
    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    const checkOut = attendance.checkOutTime!;
    const checkIn = attendance.checkInTime!;

    if (checkOut <= checkIn) {
      throw new ForbiddenException(
        attendanceMessage.CHECK_OUT_BEFORE_CHECK_IN
      );
    }

    const [eh, em] = trainer.dutyTime.endTime.split(":").map(Number);

    const dutyEnd = new Date(checkOut);
    dutyEnd.setHours(eh, em, 0);

    if (checkOut > dutyEnd) {
      throw new ForbiddenException(
        attendanceMessage.CHECK_OUT_AFTER_DUTY_TIME
      );
    }

    return trainer.branchId as string;
  }
}
