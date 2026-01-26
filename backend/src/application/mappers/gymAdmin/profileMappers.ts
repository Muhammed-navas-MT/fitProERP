import { PaymentStatus } from "../../../domain/enums/paymentStatus"
import { Roles } from "../../../domain/enums/roles"
import { Status } from "../../../domain/enums/status"
import { GymAdminProfileType, BranchResponseDTO, GymAdminProfileResponseDTO } from "../../dtos/gymAdminDto/gymAdminProfileDtos"

export const mapGymAdminToProfileResponse = (
  gymAdmin: any,
  branches: string[]
): GymAdminProfileResponseDTO => {
  return {
    _id: gymAdmin._id.toString(),
    gymName: gymAdmin.gymName,
    ownerName: gymAdmin.ownerName,
    email: gymAdmin.email,
    phone: gymAdmin.phone,

    role: gymAdmin.role ?? Roles.GYMADMIN,
    subdomain: gymAdmin.subdomain,
    description: gymAdmin.description,
    tagline: gymAdmin.tagline,

    businessLicense: gymAdmin.businessLicense,
    insuranceCertificate: gymAdmin.insuranceCertificate,

    packageId: gymAdmin.packageId
      ? gymAdmin.packageId.toString()
      : "",

    paymentStatus: gymAdmin.paymentStatus ?? PaymentStatus.PENDING,

    subscriptionStart: gymAdmin.packageStart ?? null,
    subscriptionEnd: gymAdmin.packageEnd ?? null,

    limits: {
      maxMembers: gymAdmin.limits?.maxMembers ?? 0,
      maxTrainers: gymAdmin.limits?.maxTrainers ?? 0,
      maxBranches: gymAdmin.limits?.maxBranches ?? 0,
    },

    logo: gymAdmin.logo ?? "",
    status: gymAdmin.status ?? Status.PENDING,

    branches, 

    createdAt: gymAdmin.createdAt,
  }
}
