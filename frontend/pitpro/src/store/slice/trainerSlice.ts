import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@/types/userRole";

export interface ITrainer {
  _id: string;
  email: string;
  role: UserRole;
  status: string;
  name: string;
}

const initialState: ITrainer = {
  _id: "",
  email: "",
  name: "",
  role: "TRAINER",
  status: "",
};

const trainerSlice = createSlice({
  name: "Trainer",
  initialState,
  reducers: {
    setTrainerData: (state, action: PayloadAction<ITrainer>): ITrainer => {
      return action.payload;
    },
    updateTrainerData: (state, action: PayloadAction<ITrainer>) => {
      Object.assign(state, action.payload);
    },
    clearTrainerData: () => initialState,
  },
});

export const { setTrainerData, clearTrainerData, updateTrainerData } = trainerSlice.actions;
export default trainerSlice.reducer;
