import { Document, model, Model } from "mongoose";
import { trainerSchema } from "../schemas/trainerSchema";
import { Status } from "../../../../domain/enums/status";

export interface ITrainerModel extends Document {
    _id: string;
    gymId: string;
    branchId: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    specialization: string[];
    experience: number;
    baseSalary?: number;
    commisionRate?: number;
    status?: Status;
    dutyTime?: {
        startTime: string;
        endTime: string;
    };
    createdAt: Date;
}

export const trainerModel: Model<ITrainerModel> = model<ITrainerModel>(
    "Trainer",
    trainerSchema
);