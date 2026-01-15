import { Schema } from "mongoose";
import { AttendanceStatus } from "../../../../domain/enums/attendanceStatus";
import { AttendanceUserType } from "../../../../domain/enums/attendanceUserType";

export const attendanceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "userType",
    },

    userType: {
      type: String,
      enum: Object.values(AttendanceUserType),
      required: true,
    },

    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      required: true,
    },

    checkInTime: {
      type: Date,
    },

    checkOutTime: {
      type: Date,
    },
  }
);
