export interface HealthDetails {
  gender: string;
  dateOfBirth: Date;
  weight: {
    value: number;
    unit?: string;
  };
  height: {
    value: number;
    unit?: string;
  };
  targetWeight: {
    value: number;
    unit?: string;
  };
  medicalConditions?: string;
  allergies?: string;
  fitnessGoal: string;
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

export interface listWorkoutPlanResponseDto {
  name: string;
  days: DayWorkout[];
}
