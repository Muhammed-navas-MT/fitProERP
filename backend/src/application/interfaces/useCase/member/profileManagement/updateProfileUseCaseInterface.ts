import { UpdateMemberProfileDTO } from "../../../../dtos/memberDto/profileManagementDtos";

export interface IUpdateProfileUseCase {
  execute(data: UpdateMemberProfileDTO,memberId:string): Promise<void>;
}