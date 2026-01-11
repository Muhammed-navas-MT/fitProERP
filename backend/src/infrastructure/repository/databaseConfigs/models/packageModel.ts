import { Document, model } from "mongoose"
import { packageSchema } from "../schemas/packageSchema"

export interface IPackageModel extends Document {
  _id: string
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

export const PackageModel = model<IPackageModel>(
  "Package",
  packageSchema
)
