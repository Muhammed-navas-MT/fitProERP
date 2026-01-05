import { MemberEntity } from "../../domain/entities/member/memberEntity";
import { Roles } from "../../domain/enums/roles";
import { Status } from "../../domain/enums/status";
import { IPopulatedMember } from "../../infrastructure/repository/databaseConfigs/types/populatedMemberType";
import { IAddMemberDTO, UpdateMemberDTO } from "../dtos/auth/memberDto";
import { IListMemberInGymRequestDTO, IListMemberRequestDTO, IListMemberResponseDTO, MemberDTO } from "../dtos/memberDto/listAllMembersDto";

export class TrainerMapper {
    static toListMemebersResponse(members:IPopulatedMember[],total:number,params:IListMemberRequestDTO):IListMemberResponseDTO{
        return{
            total:total,
            page:params.page,
            limit:params.limit,
            totalPages:Math.ceil(total/params.limit),
            search:params.search,
            data:members?.map(member =>({
                id:member._id?.toString(),
                name:member.name,
                branchName:member.branchId?.branchName,
                email:member.email,
                profileImg:member.profileImg,
                phone:member.phone,
                status:member.status,
                avatar:member.name.split(" ").map((val)=>val[0].toUpperCase()).join("")
            }))
        }
    };

    static toListMemebersByGymResponse(members:IPopulatedMember[],total:number,params:IListMemberInGymRequestDTO):IListMemberResponseDTO{
        return{
            total:total,
            page:params.page,
            limit:params.limit,
            totalPages:Math.ceil(total/params.limit),
            search:params.search,
            data:members?.map(member =>({
                id:member._id?.toString(),
                name:member.name,
                email:member.email,
                branchName:member.branchId?.branchName,
                profileImg:member.profileImg,
                phone:member.phone,
                status:member.status,
                avatar:member.name.split(" ").map((val)=>val[0].toUpperCase()).join(""),
                createdAt:member.createdAt
            }))
        }
    };

    static toMemberEntity(member:IAddMemberDTO,gymId:string,password:string):MemberEntity{
        return{
            gymId:gymId,
            role:Roles.MEMBER,
            trainerId:member.trainerId,
            branchId:member.branchId,
            name:member.name,
            email:member.email,
            phone:member.phone,
            address:member.address,
            password:password,
            status:Status.ACTIVE,
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

static toUpdateMemberEntity(dto: UpdateMemberDTO): Record<string, any> {
  const update: Record<string, any> = {};

  if (dto.trainerId !== undefined) update.trainerId = dto.trainerId;
  if (dto.branchId !== undefined) update.branchId = dto.branchId;
  if (dto.name !== undefined) update.name = dto.name;
  if (dto.email !== undefined) update.email = dto.email;
  if (dto.phone !== undefined) update.phone = dto.phone;
  if (dto.address !== undefined) update.address = dto.address;
  if (dto.profileImg !== undefined) update.profileImg = dto.profileImg;
  if (dto.emergencyNumber !== undefined)
    update.emergencyNumber = dto.emergencyNumber;
  if (dto.status !== undefined) update.status = dto.status;

  if (dto.healthDetails) {
    if (dto.healthDetails.gender !== undefined)
      update["healthDetails.gender"] = dto.healthDetails.gender;

    if (dto.healthDetails.dateOfBirth !== undefined)
      update["healthDetails.dateOfBirth"] = new Date(
        dto.healthDetails.dateOfBirth
      );

    if (dto.healthDetails.weight !== undefined)
      update["healthDetails.weight.value"] = dto.healthDetails.weight;

    if (dto.healthDetails.height !== undefined)
      update["healthDetails.height.value"] = dto.healthDetails.height;

    if (dto.healthDetails.targetWeight !== undefined)
      update["healthDetails.targetWeight.value"] =
        dto.healthDetails.targetWeight;

    if (dto.healthDetails.medicalConditions !== undefined)
      update["healthDetails.medicalConditions"] =
        dto.healthDetails.medicalConditions;

    if (dto.healthDetails.allergies !== undefined)
      update["healthDetails.allergies"] = dto.healthDetails.allergies;

    if (dto.healthDetails.fitnessGoal !== undefined)
      update["healthDetails.fitnessGoal"] = dto.healthDetails.fitnessGoal;
  }

  return update;
}

static toMemberDTO(member: MemberEntity): MemberDTO {
    return {
      id: member._id!,
      gymId: member.gymId,
      branchId: member.branchId ||"",
      trainerId: member.trainerId,
      name: member.name,
      email: member.email,
      phone: member.phone,
      profileImg: member.profileImg ||"",
      address: member.address,
      role: member.role,
      emergencyNumber: member.emergencyNumber,

      healthDetails: {
        gender: member.healthDetails.gender,
        dateOfBirth: member.healthDetails.dateOfBirth,
        weight: {
          value: member.healthDetails.weight.value,
          unit: member.healthDetails.weight.unit,
        },
        height: {
          value: member.healthDetails.height.value,
          unit: member.healthDetails.height.unit,
        },
        targetWeight: {
          value: member.healthDetails.targetWeight.value,
          unit: member.healthDetails.targetWeight.unit,
        },
        medicalConditions: member.healthDetails.medicalConditions ||"",
        allergies: member.healthDetails.allergies ||"",
        fitnessGoal: member.healthDetails.fitnessGoal ||"",
      },

      package: member.package
        ? {
            planId: member.package.planId,
            startDate: member.package.startDate,
            endDate: member.package.endDate,
            price: member.package.price,
            status: member.package.status,
          }
        : undefined,

      status: member.status,
    };
  }

}