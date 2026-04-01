export type BMIStatus = "Underweight" | "Normal" | "Overweight" | "Obese";

export interface ProgressType {
  id: string;
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

export interface ICreateProgressType {
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
}

export interface IUpdateProgressType {
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
}

export interface IMonthlyProgressReport {
  month: string;
  bmi: number;
  weight: number;
  bodyFatPercentage: number;
  muscleMass: number;
}

export function getBMICategory(bmi: number): BMIStatus {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function getBMICategoryColor(category: BMIStatus): string {
  switch (category) {
    case "Underweight":
      return "text-info";
    case "Normal":
      return "text-success";
    case "Overweight":
      return "text-warning";
    case "Obese":
      return "text-destructive";
  }
}

export function getBMICategoryBg(category: BMIStatus): string {
  switch (category) {
    case "Underweight":
      return "bg-info/10 border-info/20";
    case "Normal":
      return "bg-success/10 border-success/20";
    case "Overweight":
      return "bg-warning/10 border-warning/20";
    case "Obese":
      return "bg-destructive/10 border-destructive/20";
  }
}
