import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@/types/userRole";

export interface IAuthSlice {
  _id: string;
  email: string;
  role: UserRole;
  status: string;
  name: string;
  subdomain:string;
}

const initialState: IAuthSlice = {
  _id: "",
  email: "",
  name: "",
  role:"MEMBER",
  status: "",
  subdomain:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IAuthSlice>): IAuthSlice => {
      return action.payload;
    },
    updateData: (state, action: PayloadAction<IAuthSlice>) => {
      Object.assign(state, action.payload);
    },
    clearData: () => initialState,
  },
});

export const { setData, clearData, updateData } = authSlice.actions;
export default authSlice.reducer;
