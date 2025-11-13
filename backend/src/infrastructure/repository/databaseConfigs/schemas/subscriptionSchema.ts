import { Durations } from "../../../../domain/enums/duration";
import mongoose from "mongoose";

export const subscriptionSchema = new mongoose.Schema({
    planName:{type:String,required:true},
    price:{type:Number,required:true},
    duration:{type:String,enum:Object.values(Durations)},
    features:[{type:String}],
    isActive:{type:Boolean}
},
 { timestamps: true }
)