import { GymAdminEntity } from "../../domain/entities/gymAdmin/gymAdminEntity";
import { PaymentStatus } from "../../domain/enums/paymentStatus";
import { Roles } from "../../domain/enums/roles";
import { Status } from "../../domain/enums/status";
import { ISignupRequsetDTO } from "../dtos/auth/gymAdminSignupDto";
import { IGymListItemDTO, IListGymsResponseDTO } from "../dtos/gymAdminDto/gymManagementDtos";

export class GymAdminMapper {
    static toGymAdminEntity(data:ISignupRequsetDTO):GymAdminEntity {
        return{
            gymName:data.gymName,
            ownerName:data.ownerName,
            email:data.email,
            phone:data.phone,
            password:data.password,
            role:Roles.GYMADMIN,
            subdomain:data.subdomain,
            description:data.description,
            tagline:data.tagline,
            businessLicense:data.businessLicense as string,
            insuranceCertificate:data.insuranceCertificate as string,
            paymentStatus:PaymentStatus.PENDING,
            logo:data.logo as string,
            status:Status.PENDING,
        }
    };

    static toListGymsResponse(gym:(GymAdminEntity & { planName: string }),trainersCount:number):IGymListItemDTO{
        return {
            id:gym._id as string || "",
            gymName:gym.gymName || "",
            ownerName:gym.ownerName || "",
            email:gym.email || "",
            phone:gym.phone || "",
            plan:gym.planName || "",
            branchesCount:gym.branches?.length ?? 0,
            trainersCount:trainersCount || 0,
            status:gym?.status ?? Status.PENDING,
            createdAt:gym?.createdAt ?? new Date()
        }
    }
}