import { BMIStatus } from "../../enums/BMIStatus";

export interface ProgressEntity {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}
