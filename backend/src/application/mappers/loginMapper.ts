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
            role:gymAdmin.role || "",
            email:gymAdmin.email || "",
            status:gymAdmin.status || "",
            subscriptions:!!subscription ? subscription.map((val)=>{
                return{
                    _id:val._id?.toString()||"",
                    planName:val.planName || "",
                    price:val.price || 0,
                    duration:val.duration || "",
                    features:val.features || [],
                }
            }):[]
        }
    };
    static trainerLoginMapper(trainer:TrainerEntity):TrainerLoginResponseDTO{
        return{
            name:trainer.name || "",
            _id:trainer._id?.toString() || "",
            email:trainer.email || "",
            role:trainer.role || "",
            status:trainer.status || "",
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