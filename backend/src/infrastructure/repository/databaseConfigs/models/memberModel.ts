import { Document, model, Model } from "mongoose";
import { memberSchema } from "../schemas/memberSchema";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { BloodGroups } from "../../../../domain/enums/bloocGroup";

export interface IMemberModel extends Document {
    _id: string;
    gymId: string;
    branchId?: string;
    trainerId: string;
    firstName: string;
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
            unit: string;
        };
        height: {
            value: number;
            unit: string;
        };
        targetWeight: {
            value: number;
            unit: string;
        };
        bloodGroup: BloodGroups;
        medicalConditions: string;
        allergies: string;
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