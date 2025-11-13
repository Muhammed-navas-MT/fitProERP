import { Roles } from "../../../../domain/enums/roles";
import mongoose from "mongoose";


 export const superAdminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:Object.values(Roles)}
});