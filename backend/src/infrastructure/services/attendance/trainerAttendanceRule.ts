import { ForbiddenException, NOtFoundException } from "../../../application/constants/exceptions";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { AttendanceRule } from "../../../application/interfaces/service/attendanceRule";
import { AttendanceEntity } from "../../../domain/entities/shared/attendanceEntity";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { attendanceMessage } from "../../../presentation/shared/constants/messages/attendanceMessages";

export class TrainerAttendanceRule implements AttendanceRule {
  constructor(private _trainerRepository:ITrainerRepository) {}

  async validate(attendance: AttendanceEntity): Promise<string> {
    const trainer = await this._trainerRepository.findById(attendance.userId);
    if (!trainer) throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND)

    const checkIn = attendance.checkInTime!;
    const [sh, sm] = trainer.dutyTime.startTime.split(":").map(Number);
    const [eh, em] = trainer.dutyTime.endTime.split(":").map(Number);

    const start = new Date(checkIn);
    start.setHours(sh, sm, 0);

    const end = new Date(checkIn);
    end.setHours(eh, em, 0);

    if (checkIn < start || checkIn > end) {
      throw new ForbiddenException(attendanceMessage.OUTSIDE_TRAINER_WORKING_HOURS);
    }
    return trainer.branchId as string;
  }
}
