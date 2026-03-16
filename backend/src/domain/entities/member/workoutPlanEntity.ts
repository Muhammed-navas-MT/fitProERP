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

export interface WorkoutPlanEntity {
  _id?: string;
  memberId: string;
  name: string;
  createdAt?: Date;
  days: DayWorkout[];
}
