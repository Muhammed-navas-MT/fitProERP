import { BMIStatus } from "../../../domain/enums/BMIStatus";

export interface ICreateProgressDto {
  weight: {
    value: number;
    unit: "kg" | "lbs";
  };
  bodyFatPercentage?: number;
  muscleMass?: {
    value: number;
    unit: "kg" | "lbs";
  };
  note?: string;
  progressDate?: Date;
}

export interface IUpdateProgressDto {
  weight?: {
    value: number;
    unit: "kg" | "lbs";
  };
  bodyFatPercentage?: number;
  muscleMass?: {
    value: number;
    unit: "kg" | "lbs";
  };
  note?: string;
  progressDate?: Date;
}

export interface IFindProgressDto {
  id: string;
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
}

export interface IProgressItem {
  id: string;
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
}

export interface IListProgressRequestDto {
  memberId: string;
  page: number;
  limit: number;
}

export interface IMonthlyProgressReport {
  month: string;
  bmi: number;
  weight: number;
  bodyFatPercentage: number;
  muscleMass: number;
}

export interface ILatestProgressSummary {
  currentWeight: {
    value: number;
    unit: "kg" | "lbs";
  } | null;
  bmi: number | null;
  bmiCategory: BMIStatus | null;
  bodyFatPercentage: number | null;
  muscleMass: {
    value: number;
    unit: "kg" | "lbs";
  } | null;
  progressDate: Date | null;
}

export interface IMonthlyProgressStatus {
  hasAddedThisMonth: boolean;
  currentMonth: string;
}

export interface IGoalWeightStatus {
  targetWeight: {
    value: number;
    unit: "kg" | "lbs";
  } | null;
  achieved: boolean;
  remainingWeight: number | null;
  differenceFromTarget: number | null;
  message: string;
}

export interface IListProgressResponseDto {
  progress: IProgressItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  latestProgress: ILatestProgressSummary;
  monthlyStatus: IMonthlyProgressStatus;
  goalWeightStatus: IGoalWeightStatus;
}
