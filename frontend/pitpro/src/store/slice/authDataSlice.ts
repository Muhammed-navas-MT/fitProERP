import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { StatusTypes } from "@/types/statusType";
import { UserRole } from "@/types/userRole";

/* -----------------------------------------------
   Base Interface
-------------------------------------------------*/
interface BaseData {
  id: string;
  email: string;
  phone: string;
  role: UserRole;       // ✔ Correct union type
  status: StatusTypes;
}

/* -----------------------------------------------
   Extended User Types
-------------------------------------------------*/
export interface MemberData extends BaseData {
  gymId: string;
  branchId: string;
  trainerId: string;
  firstName: string;
  profileImg: string;
}

export interface TrainerData extends BaseData {
  gymId: string;
  branchId: string;
  name: string;
  baseSalary: number;
}

export interface GymAdminData extends BaseData {
  gymName: string;
  ownerName: string;
  subdomain: string;
  tagline: string;
  logo: string;
}

export interface SuperAdminData extends BaseData {
  name: string;
}

/* -----------------------------------------------
   Auth Data Union Type
-------------------------------------------------*/
export type AuthData =
  | MemberData
  | TrainerData
  | GymAdminData
  | SuperAdminData
  | null;

/* -----------------------------------------------
   Backend Response Payload Type
-------------------------------------------------*/
type PayloadFromAPI = {
  _id: string;
  email: string;
  phone: string;
  role: UserRole;
  status: StatusTypes;
  createdAt: string;
  [key: string]: any; // dynamic fields for each role
};

/* -----------------------------------------------
   Allowed Update Types
-------------------------------------------------*/
type AuthDataUpdate = Partial<
  Omit<MemberData | TrainerData | GymAdminData | SuperAdminData, "id" | "role">
>;

/* -----------------------------------------------
   Initial State
-------------------------------------------------*/
const initialState: AuthData = null;

/* -----------------------------------------------
   Slice
-------------------------------------------------*/
const AuthDataSlice = createSlice({
  name: "AuthData",
  initialState,
  reducers: {
    setData: (_, action: PayloadAction<PayloadFromAPI>): AuthData => {
      const payload = action.payload;

      const baseData: BaseData = {
        id: payload._id,
        email: payload.email,
        phone: payload.phone,
        role: payload.role,
        status: payload.status,
      };

      switch (payload.role) {
        case "MEMBER":
          return {
            ...baseData,
            gymId: payload.gymId,
            branchId: payload.branchId,
            trainerId: payload.trainerId,
            firstName: payload.firstName,
            profileImg: payload.profileImg,
          };

        case "TRAINER":
          return {
            ...baseData,
            gymId: payload.gymId,
            branchId: payload.branchId,
            name: payload.name,
            baseSalary: payload.baseSalary,
          };

        case "GYMADMIN":
          return {
            ...baseData,
            gymName: payload.gymName,
            ownerName: payload.ownerName,
            subdomain: payload.subdomain,
            tagline: payload.tagline,
            logo: payload.logo,
          };

        case "SUPERADMIN":
          return {
            ...baseData,
            name: payload.name,
          };

        default:
          return null;
      }
    },

    updateUserData: (state, action: PayloadAction<AuthDataUpdate>): AuthData => {
      if (!state) return null;

      return {
        ...state,
        ...action.payload,
      };
    },

    clearData: (): AuthData => null,
  },
});

/* -----------------------------------------------
   Exports
-------------------------------------------------*/
export const { setData, clearData, updateUserData } = AuthDataSlice.actions;
export default AuthDataSlice.reducer;
