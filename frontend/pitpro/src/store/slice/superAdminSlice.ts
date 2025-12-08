import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@/types/userRole";

export interface ISuperAdmin {
    id: string;
    name:string;
    email: string;
    role: UserRole;
};

const initialState:ISuperAdmin = {
    id:"",
    name:"",
    email:"",
    role:"SUPERADMIN"
}

const SuperAdminSlice = createSlice({
    name:"SuperAdmin",
    initialState,
    reducers:{
        setSuperAdminData:(state,action:PayloadAction<ISuperAdmin>):ISuperAdmin => {
            return action.payload
        },
        updateSuperAdminData :(state,action:PayloadAction<ISuperAdmin>)=>{
            Object.assign(state,action.payload);
        },
        clearSuperAdminData:()=>initialState
    }
});

export const {setSuperAdminData,updateSuperAdminData,clearSuperAdminData} = SuperAdminSlice.actions;
export default SuperAdminSlice.reducer;

