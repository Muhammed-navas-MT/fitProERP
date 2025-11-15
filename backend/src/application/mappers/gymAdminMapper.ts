import { GymAdminEntity } from "../../domain/entities/gymAdmin/gymAdminEntity";
import { PaymentStatus } from "../../domain/enums/paymentStatus";
import { Roles } from "../../domain/enums/roles";
import { Status } from "../../domain/enums/status";
import { ISignupRequsetDTO } from "../dtos/auth/gymAdminSignupDto";

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
            businessLicense:data.businessLicense,
            insuranceCertificate:data.insuranceCertificate,
            paymentStatus:PaymentStatus.PENDING,
            logo:data.logo,
            status:Status.PENDING,
        }
    }
}