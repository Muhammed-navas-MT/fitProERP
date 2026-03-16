import { Document, model, Model } from "mongoose";
import { MealType } from "../../../../domain/enums/mealTypes";
import { dietPlanSchema } from "../schemas/deitPlanSchema";

export interface IFood {
  name: string;
  quantity?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

export interface IMeal {
  mealType: MealType;
  time?: string;
  foods: IFood[];
}

export interface IDietDay {
  day: string;
  dailyCalories?: number;
  dailyProtein?: number;
  dailyCarbs?: number;
  dailyFats?: number;
  meals: IMeal[];
}

export interface IDietPlanModel extends Document {
  _id: string;
  memberId: string;
  planName: string;
  goalType?: string;
  days: IDietDay[];
  createdAt: Date;
  updatedAt: Date;
}

export const dietPlanModel: Model<IDietPlanModel> = model<IDietPlanModel>(
  "DeitPlan",
  dietPlanSchema,
);
