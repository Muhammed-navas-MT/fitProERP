import { Document, Types } from "mongoose";
import { TrainerAttendanceEntity } from "../../../../domain/entities/trainer/trainerAttendanceEntity";

export interface ITrainerAttendanceModel
  extends Document,
    Omit<TrainerAttendanceEntity, "id" | "trainerId"> {
        trainerId: Types.ObjectId;
}