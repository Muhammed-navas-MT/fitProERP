export interface UpdateTrainerType {
  gymId: string;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string[];
  experience: number;
  baseSalary: number;
  commisionRate: number;
  status: string;
  allocatedLeaveCount: number;
  sessionCount: number;
  dutyTime: {
    startTime: string;
    endTime: string;
  };
  address: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  sessionCount: number;
  allocatedLeaveCount: number;
  specializations: string[];
  branchName:string;
  status: string;
  avatar: string;
}
