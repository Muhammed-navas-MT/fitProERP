import { UserRole } from "./userRole";

export type OtpPayload = {
  email: string;
  otp: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role:UserRole;
  gymName: string;
  tagline: string;
  description: string;
  logo: File | null;
  businessLicense: File | null;
  insuranceCertificate: File | null;
}

export type TrainerAddPayload = {
    gymId: string;
    branchId?: string;
    name: string;
    email: string;
    phone: string;
    role:UserRole;
    address: string;
    specialization: string[];
    experience: number;
    baseSalary: number;
    commisionRate: number;
    status: string;
    dutyTime: {
        startTime: string;
        endTime: string;
    };
};

export type MemberAddPayload = {
  trainerId:string;
  branchId:string;
  name: string;
  email: string;
  phone: string;
  address:string;
  emergencyNumber:string;
  healthDetails:{
    gender:string,
    dateOfBirth:string,
    weight:number,
    height:number,
    targetWeight:number
    medicalConditions?:string,
    allergies?:string,
    fitnessGoal:string
  }
}

export type MemberUpdatePayload = {
  trainerId:string;
  branchId:string;
  name: string;
  email: string;
  phone: string;
  address:string;
  emergencyNumber:string;
  healthDetails:{
    gender:string,
    dateOfBirth:string,
    weight:number,
    height:number,
    targetWeight:number
    medicalConditions?:string,
    allergies?:string,
    fitnessGoal:string
  }
}