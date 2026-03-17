import { model } from "mongoose";
import { SessionStatus } from "../../../../domain/enums/sessionStatus";
import { SessionSchema } from "../schemas/sessionSchema";

export interface ISessionModel extends Document {
  _id: string;
  memberId: string;
  trainerId: string;
  sessionDate: Date;
  duration: number;
  feedback?: string;
  status: SessionStatus;
  createdAt: Date;
}

export const sessionModel = model<ISessionModel>("Session", SessionSchema);
