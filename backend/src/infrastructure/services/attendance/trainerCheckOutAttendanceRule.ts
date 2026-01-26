import {
  BadRequestException,
  ForbiddenException,
  NOtFoundException,
} from "../../../application/constants/exceptions";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { AttendanceRule } from "../../../application/interfaces/service/attendanceRule";
import { AttendanceEntity } from "../../../domain/entities/shared/attendanceEntity";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { attendanceMessage } from "../../../presentation/shared/constants/messages/attendanceMessages";

export class TrainerCheckOutAttendanceRule implements AttendanceRule {
  constructor(private _trainerRepository: ITrainerRepository) {}

  async validate(attendance: AttendanceEntity): Promise<string> {
    if (!attendance.userId) {
      throw new BadRequestException("attendance.userId is missing");
    }

    const trainer = await this._trainerRepository.findById(attendance.userId);
    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    if (!attendance.checkInTime || !attendance.checkOutTime) {
      throw new ForbiddenException(attendanceMessage.CHECK_OUT_BEFORE_CHECK_IN);
    }

    const checkIn = new Date(attendance.checkInTime);
    const checkOut = new Date(attendance.checkOutTime);

    if (checkOut <= checkIn) {
      throw new ForbiddenException(attendanceMessage.CHECK_OUT_BEFORE_CHECK_IN);
    }

    // Parse duty end time (assume trainer.dutyTime.endTime is in "HH:mm" local time)
    const [endHour, endMinute] = trainer.dutyTime.endTime.split(":").map(Number);

    // Create a Date object for duty end on the same day as checkOut
    const dutyEnd = new Date(checkOut);
    dutyEnd.setHours(endHour, endMinute, 0, 0); // Local gym time

    console.log("Duty end:", dutyEnd.toString());
    console.log("Check out:", checkOut.toString());

    // Prevent checkout before duty end
    if (checkOut < dutyEnd) {
      throw new ForbiddenException(attendanceMessage.CHECK_OUT_BEFORE_DUTY_END);
    }

    // If passed all checks, return branchId
    return trainer.branchId as string;
  }
}
