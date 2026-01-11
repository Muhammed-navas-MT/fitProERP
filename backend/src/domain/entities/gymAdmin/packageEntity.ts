export interface PackageEntity {
  id?: string
  gymId: string
  branchId: string
  name: string
  durationInDays: number
  price: number
  features: string[]
  isDailySession: boolean
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}
