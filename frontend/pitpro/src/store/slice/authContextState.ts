import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@/types/userRole";

interface AuthContextState {
  role: UserRole | null;
  subdomain: string | null;
}

const initialState: AuthContextState = {
  role: null,
  subdomain: null,
};

const authContextSlice = createSlice({
  name: "authContext",
  initialState,
  reducers: {
    setAuthContext(
      state,
      action: PayloadAction<{ role: UserRole; subdomain?: string }>
    ) {
      state.role = action.payload.role;
      state.subdomain = action.payload.subdomain || null;
    },
    clearAuthContext(state) {
      state.role = null;
      state.subdomain = null;
    },
  },
});

export const { setAuthContext, clearAuthContext } =
  authContextSlice.actions;

export default authContextSlice.reducer;
