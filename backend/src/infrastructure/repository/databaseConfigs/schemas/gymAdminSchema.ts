import mongoose from "mongoose";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";


export const gymAdminSchema = new mongoose.Schema({
    gymName:{type:String,required:true,unique:true},
    ownerName:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:Object.values(Roles)},
    subdomain:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    tagline:{type:String,required:true},
    businessLicense:{type:String,required:true},
    insuranceCertificate:{type:String,required:true},
    subscriptionId:{},
    subscriptionStart:{type:Date,required:true},
    subscriptionEnd:{type:Date,required:true},
    logo:{type:String,required:true},
    status:{type:String,enum:Object.values(Status)},
    branches:{},
},
  {timestamps:true}
)