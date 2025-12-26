import { Document, model, Model } from "mongoose";
import { memberSchema } from "../schemas/memberSchema";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";

export interface IMemberModel extends Document {
    _id: string;
    gymId: string;
    branchId?: string;
    trainerId: string;
    name: string;
    email: string;
    phone: string;
    profileImg?: string;
    address: string;
    password: string;
    role: Roles;
    emergencyNumber: string;
    healthDetails: {
        gender: string;
        dateOfBirth: Date;
        weight: {
            value: number;
            unit?: string;
        };
        height: {
            value: number;
            unit?: string;
        };
        targetWeight: {
            value: number;
            unit?: string;
        };
        medicalConditions?: string;
        allergies?: string;
        fitnessGoal: string;
    };
    package?: {
        planId: string;
        startDate?: Date;
        endDate?: Date;
        price: number;
        status: PaymentStatus;
    };
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

export const memberModel: Model<IMemberModel> = model<IMemberModel>(
    "Member",
    memberSchema
);