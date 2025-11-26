import { Status } from "../../../domain/enums/status";
import { Roles } from "../../../domain/enums/roles";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { BloodGroups } from "../../../domain/enums/bloocGroup";

export interface IAddMemberDTO {
    gymId: string;
    branchId?: string;
    trainerId: string;
    firstName: string;
    email: string;
    phone: string;
    address: string;
    password?: string;
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
}

export interface IUpdateMemberDTO {
    firstName?: string;
    email?: string;
    phone?: string;
    profileImg?: string;
    address?: string;
    emergencyNumber?: string;
    healthDetails?: {
        gender?: string;
        dateOfBirth?: Date;
        weight?: {
            value?: number;
            unit?: string;
        };
        height?: {
            value?: number;
            unit?: string;
        };
        targetWeight?: {
            value?: number;
            unit?: string;
        };
        bloodGroup?: string;
        medicalConditions?: string;
        allergies?: string;
        fitnessGoal?: string;
    };
    status?: Status;
}