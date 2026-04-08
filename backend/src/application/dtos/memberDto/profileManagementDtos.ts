export interface UpdateMemberProfileDTO {
  name?: string;
  phone?: string;
  address?: string;
  emergencyNumber?: string;
  healthDetails?: {
    gender?: string;
    dateOfBirth?: Date;
    weight?: string;
    height?: string;
    targetWeight?: string;
    medicalConditions?: string;
    allergies?: string;
    fitnessGoal?: string;
  };
}

export interface IChangePasswordRequestDTO {
  memberId: string;
  oldPassword: string;
  newPassword: string;
}
