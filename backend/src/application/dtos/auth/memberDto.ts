export interface IAddMemberDTO {
  trainerId: string;
  branchId:string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyNumber: string;
  healthDetails: {
    gender: string;
    dateOfBirth: string;
    weight: number;
    height: number;
    targetWeight: number;
    medicalConditions?: string;
    allergies?: string;
    fitnessGoal: string;
  };
}

export interface UpdateMemberDTO {
  trainerId?: string;
  branchId?:string
  name?: string;
  phone?: string;
  address?: string;
  emergencyNumber?: string;
  healthDetails?: {
    gender?: string;
    dateOfBirth?: string;
    weight?: number;
    height?: number;
    targetWeight?: number;
    fitnessGoal?: string;
  };
}

