import { Document, model, Model } from "mongoose";
import { workoutPlanSchema } from "../schemas/workoutPlanSchema";

export interface IExercise {
  name?: string;
  equipment?: string;
  sets?: string;
  reps?: string;
  rest?: string;
}

export interface IDayWorkout {
  dayOfWeek: string;
  targetMuscles: string[];
  exercises: IExercise[];
}

export interface IWorkoutPlanModel extends Document {
  _id: string;
  memberId: string;
  name: string;
  days: IDayWorkout[];
  createdAt: Date;
  updatedAt: Date;
}

export const workoutPlanModel: Model<IWorkoutPlanModel> =
  model<IWorkoutPlanModel>("WorkoutPlan", workoutPlanSchema);
