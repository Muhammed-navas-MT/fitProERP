import { Types } from "mongoose";
import { Status } from "../../../../domain/enums/status";
import { Roles } from "../../../../domain/enums/roles";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";

export interface IPopulatedBranch {
  _id: Types.ObjectId;
  branchName: string;
}

export interface IPopulatedMember {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  avatar?: string;
  status: Status;
  branchId?: IPopulatedBranch | null;
  createdAt: Date;
}

export interface IPopulatedPlan {
  _id: string;
  name: string;
}

export interface IPopulatedGym {
  _id: string;
  gymName: string;
}

export interface PopulatedBranch {
  _id: string;
  branchName: string;
}

export interface IPopulatedMemberType {
  _id: string;
  gymId: IPopulatedGym;
  branchId?: PopulatedBranch;
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
    planId: IPopulatedPlan;
    startDate?: Date;
    endDate?: Date;
    price: number;
    status: PaymentStatus;
  };
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}
