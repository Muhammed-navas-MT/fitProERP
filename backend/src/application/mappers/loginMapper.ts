import strict from "assert/strict";
import { GymAdminEntity } from "../../domain/entities/gymAdmin/gymAdminEntity";
import { SubscriptionEntity } from "../../domain/entities/superAdmin/subscriptionEntity";
import { GymAdminLoginResponseDTO, MemberLoginResponseDTO, TrainerLoginResponseDTO } from "../dtos/auth/loginDto";
import { TrainerEntity } from "../../domain/entities/trainer/trainerEntity";
import { MemberEntity } from "../../domain/entities/member/memberEntity";

export class LoginMapper {
    static gymAdminloginMapper(gymAdmin:GymAdminEntity,subscription?:SubscriptionEntity[]|[]):GymAdminLoginResponseDTO{
        return{
            _id:gymAdmin._id?.toString()||"",
            gymName:gymAdmin.gymName || "",
            ownerName:gymAdmin.ownerName || "",
            role:gymAdmin.role || "",
            email:gymAdmin.email || "",
            phone:gymAdmin.phone || "",
            subdomain:gymAdmin.subdomain || "",
            status:gymAdmin.status || ""
        }
    };
    static trainerLoginMapper(data:{trainer:TrainerEntity,subdomain:string}):TrainerLoginResponseDTO{
        return{
            name:data.trainer.name || "",
            _id:data.trainer._id?.toString() || "",
            email:data.trainer.email || "",
            role:data.trainer.role || "",
            status:data.trainer.status || "",
            subdomain:data.subdomain ||"",
        }
    }

    static memberLoginMapper(member:MemberEntity):MemberLoginResponseDTO{
        return {
            _id:member._id?.toString() ||"",
            firstName:member.firstName || "",
            email:member.email || "",
            role:member.role || "",
            status:member.status || ""
        }
    }
}