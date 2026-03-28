import { Document, model, Model } from "mongoose";
import { ProgressSchema } from "../schemas/progressSchema";
import { BMIStatus } from "../../../../domain/enums/BMIStatus";

export interface IProgressModel extends Document {
  _id: string;
  memberId: string;
  weight: {
    value: number;
    unit: "kg" | "lbs";
  };
  bmi: number;
  bmiCategory: BMIStatus;
  bodyFatPercentage?: number;
  muscleMass?: {
    value: number;
    unit: "kg" | "lbs";
  };
  note?: string;
  progressDate: Date;
  createdAt: Date;
}

export const progressModel: Model<IProgressModel> = model<IProgressModel>(
  "Progress",
  ProgressSchema,
);
