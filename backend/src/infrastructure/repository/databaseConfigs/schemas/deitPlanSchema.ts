import mongoose from "mongoose";
import { MealType } from "../../../../domain/enums/mealTypes";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: String,

  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
});

const mealSchema = new mongoose.Schema({
  mealType: {
    type: String,
    enum: Object.values(MealType),
    required: true,
  },

  time: String,

  foods: [foodSchema],
});

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },

  dailyCalories: Number,
  dailyProtein: Number,
  dailyCarbs: Number,
  dailyFats: Number,

  meals: [mealSchema],
});

export const dietPlanSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    planName: {
      type: String,
      required: true,
    },

    goalType: {
      type: String,
    },

    days: [daySchema],
  },
  { timestamps: true },
);
