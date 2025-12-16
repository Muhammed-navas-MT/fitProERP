import { MemberEntity } from "../../domain/entities/member/memberEntity";
import { Roles } from "../../domain/enums/roles";
import { IAddMemberDTO } from "../dtos/auth/memberDto";
import { IListMemberRequestDTO, IListMemberResponseDTO } from "../dtos/memberDto/listAllMembersDto";

export class TrainerMapper {
    static toListMemebersResponse(members:MemberEntity[],total:number,params:IListMemberRequestDTO):IListMemberResponseDTO{
        return{
            total:total,
            page:params.page,
            limit:params.limit,
            totalPages:Math.ceil(total/params.limit),
            search:params.search,
            data:members?.map(member =>({
                id:member._id?.toString(),
                name:member.name,
                role:member.role,
                email:member.email,
                profileImg:member.profileImg,
                phone:member.phone,
                status:member.status,
                avatar:member.name.split(" ").map((val)=>val[0].toUpperCase()).join("")
            }))
        }
    };

    static toMemberEntity(member:IAddMemberDTO,gymId:string,password:string):MemberEntity{
        return{
            gymId:gymId,
            role:Roles.MEMBER,
            trainerId:member.trainerId,
            name:member.name,
            email:member.email,
            phone:member.phone,
            address:member.address,
            password:password,
            emergencyNumber:member.emergencyNumber,
            healthDetails:{
                gender:member.healthDetails.gender,
                dateOfBirth:new Date(member.healthDetails.dateOfBirth),
                weight:{
                    value:member.healthDetails.weight
                },
                height:{
                    value:member.healthDetails.height
                },
                targetWeight:{
                    value:member.healthDetails.targetWeight
                },
                medicalConditions:member.healthDetails.medicalConditions,
                allergies:member.healthDetails.allergies,
                fitnessGoal:member.healthDetails.fitnessGoal
            }
        }
    }
}