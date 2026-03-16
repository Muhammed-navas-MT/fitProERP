import { Schema } from "mongoose";

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
    },
    equipment: {
      type: String,
    },
    sets: {
      type: String,
    },
    reps: {
      type: String,
    },
    rest: {
      type: String,
    },
  },
  { _id: false },
);

const dayWorkoutSchema = new Schema(
  {
    dayOfWeek: {
      type: String,
      required: true,
    },

    targetMuscles: [
      {
        type: String,
        required: true,
      },
    ],

    exercises: [exerciseSchema],
  },
  { _id: false },
);

export const workoutPlanSchema = new Schema(
  {
    memberId: {
      type: String,
      required: true,
      ref: "Member",
    },

    name: {
      type: String,
      required: true,
    },

    days: [dayWorkoutSchema],
  },
  {
    timestamps: true,
  },
);
