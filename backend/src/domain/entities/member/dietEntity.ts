import { MealType } from "../../enums/mealTypes";

export interface Food {
  name: string;
  quantity?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

export interface Meal {
  mealType: MealType;
  time?: string;
  foods: Food[];
}

export interface DietDay {
  day: string;
  dailyCalories?: number;
  dailyProtein?: number;
  dailyCarbs?: number;
  dailyFats?: number;
  meals: Meal[];
}

export interface DietPlanEntity {
  id?: string;
  memberId: string;
  planName: string;
  goalType?: string;
  days: DietDay[];
  createdAt?: Date;
  updatedAt?: Date;
}
