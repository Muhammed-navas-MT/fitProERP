import { GymAdminEntity } from "../../domain/entities/gymAdmin/gymAdminEntity";
import { SubscriptionEntity } from "../../domain/entities/superAdmin/subscriptionEntity";
import { PaymentStatus } from "../../domain/enums/paymentStatus";
import { Roles } from "../../domain/enums/roles";
import { Status } from "../../domain/enums/status";
import { ISignupRequsetDTO } from "../dtos/auth/gymAdminSignupDto";
import {
  IGymAdminDetailDTO,
  IGymListItemDTO,
  IListGymsResponseDTO,
} from "../dtos/superAdminDto/gymManagementDtos";

export class GymAdminMapper {
  static toGymAdminEntity(data: ISignupRequsetDTO): GymAdminEntity {
    return {
      gymName: data.gymName,
      ownerName: data.ownerName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: Roles.GYMADMIN,
      subdomain: data.subdomain,
      description: data.description,
      tagline: data.tagline,
      businessLicense: data.businessLicense as string,
      insuranceCertificate: data.insuranceCertificate as string,
      paymentStatus: PaymentStatus.PENDING,
      logo: data.logo as string,
      status: Status.PENDING,
    };
  }

  static toListGymsResponse(
    gym: GymAdminEntity & { planName: string },
    trainersCount: number
  ): IGymListItemDTO {
    return {
      id: (gym._id as string) || "",
      gymName: gym.gymName || "",
      ownerName: gym.ownerName || "",
      email: gym.email || "",
      phone: gym.phone || "",
      plan: gym.planName || "",
      branchesCount: gym.branches?.length ?? 0,
      trainersCount: trainersCount || 0,
      status: gym?.status ?? Status.PENDING,
      createdAt: gym?.createdAt ?? new Date(),
    };
  }

  static mapGymAdminToDetailDTO(
  gymAdmin: GymAdminEntity,
  subscription: SubscriptionEntity | null,
  membersCount: number,
  trainersCount: number
): IGymAdminDetailDTO {
  return {
    id: (gymAdmin._id as string) || "",
    name: gymAdmin.gymName || "",
    status: gymAdmin.status ?? Status.PENDING,
    businessLicense: gymAdmin.businessLicense || "",
    insuranceCertificate: gymAdmin.insuranceCertificate || "",
    totalBranches: gymAdmin.branches?.length ?? 0,
    totalMembers: membersCount ?? 0,
    totalTrainers: trainersCount ?? 0,

    owner: {
      name: gymAdmin.ownerName || "",
      email: gymAdmin.email || "",
      phone: gymAdmin.phone || "",
    },

    subscription: subscription
      ? {
          currentPlan: subscription.planName || "",
          price: subscription.price || 0,
          memberSince: gymAdmin.createdAt?.toISOString() || "",
        }
      : null,
  };
}

}
