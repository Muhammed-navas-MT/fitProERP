import { BMIStatus } from "../../../domain/enums/BMIStatus";

export interface ICreateProgressDto {
  memberId: string;
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
  progressId: string;
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

export interface IListProgressResponseDto {
  progress: IProgressItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
