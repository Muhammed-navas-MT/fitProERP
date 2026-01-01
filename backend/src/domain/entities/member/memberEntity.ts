import { Status } from "../../enums/status";
import { Roles } from "../../enums/roles";
import { PaymentStatus } from "../../enums/paymentStatus";

export interface MemberEntity {
    _id?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
}