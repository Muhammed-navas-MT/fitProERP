export interface DashboardDto {
  daysTrained: number;
  currentWeight: {
    value: number;
    unit: "kg" | "lbs";
  };
  todayWorkout: DayWorkout | null;
  progressGraphData: IMonthlyProgressReport[];
}

export interface IMonthlyProgressReport {
  month: string;
  bmi: number;
  weight: number;
  bodyFatPercentage: number;
  muscleMass: number;
}

export interface Exercise {
  name?: string;
  equipment?: string;
  sets?: string;
  reps?: string;
  rest?: string;
}

export interface DayWorkout {
  dayOfWeek: string;
  targetMuscles: string[];
  exercises: Exercise[];
}
