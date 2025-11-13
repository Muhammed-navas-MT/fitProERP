import mongoose from "mongoose";
import { env } from "process";


export class MongodbConfig {
    public static connect() {
        mongoose.connect(process.env.MONGO_URI!)
        .then(()=>console.log("mongodb connected.."))
        .catch((err)=>{
            console.log(err);
        })
    }
}