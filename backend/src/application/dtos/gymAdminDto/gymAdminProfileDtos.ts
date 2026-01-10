import { PaymentStatus } from "../../../domain/enums/paymentStatus"
import { Roles } from "../../../domain/enums/roles"
import { Status } from "../../../domain/enums/status"

export interface UpdateGymAdminProfileRequestDTO {
  ownerName?: string
  tagline?: string
  description?: string
  phone?: string
  logo?: Express.Multer.File | string
}

export interface GymAdminProfileResponseDTO {
  _id: string
  gymName: string
  ownerName: string
  email: string
  phone: string
  role: Roles
  subdomain: string
  description: string
  tagline: string
  businessLicense: string
  insuranceCertificate: string
  packageId: string
  paymentStatus:PaymentStatus
  subscriptionStart: Date
  subscriptionEnd: Date
  limits: {
    maxMembers: number,
    maxTrainers: number,
    maxBranches: number,
  }
  logo: string
  status:Status
  branches: string[]
  createdAt: Date
}

export interface IChangePasswordRequestDTO {
  gymAdminId: string;
  oldPassword: string;
  newPassword: string;
}

export interface BranchResponseDTO {
  branchName: string
}

export interface GymAdminProfileType {
  _id: string
  gymName: string
  ownerName: string
  email: string
  phone: string
  role: Roles
  subdomain: string
  description: string
  tagline: string
  businessLicense: string
  insuranceCertificate: string
  packageId: string
  paymentStatus: PaymentStatus
  subscriptionStart: Date | null
  subscriptionEnd: Date | null
  limits: {
    maxMembers: number
    maxTrainers: number
    maxBranches: number
  }
  logo: string
  status: Status
  branches: BranchResponseDTO[]
  createdAt: Date
}
