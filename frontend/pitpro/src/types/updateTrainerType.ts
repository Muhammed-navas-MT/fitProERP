export interface UpdateTrainerType {
  gymId: string
  branchId: string
  name: string
  email: string
  phone: string
  role: string
  specialization: string[]
  experience: number
  baseSalary: number
  commisionRate: number
  status: string
  dutyTime: {
    startTime: string
    endTime: string
  }
  address: string
}
