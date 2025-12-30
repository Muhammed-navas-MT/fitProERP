import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@/types/userRole";

export interface IGymAdmin {
    _id: string;
    gymName:string;
    ownerName:string;
    subdomain:string;
    phone:string;
    email: string;
    role: UserRole;
    status:string;
};



const initialState:IGymAdmin = {
    _id: "",
    gymName:"",
    ownerName:"",
    subdomain:"",
    phone:"",
    email:"",
    role:"GYMADMIN",
    status:""
}

const gymAdminSlice = createSlice({
    name:"SuperAdmin",
    initialState,
    reducers:{
        setGymAdminData:(state,action:PayloadAction<IGymAdmin>):IGymAdmin => {
            return action.payload
        },
        updateGymAdminData :(state,action:PayloadAction<IGymAdmin>)=>{
            Object.assign(state,action.payload);
        },
        clearGymAdminData:()=>initialState
    }
});

export const {setGymAdminData,updateGymAdminData,clearGymAdminData} = gymAdminSlice.actions;
export default gymAdminSlice.reducer;

