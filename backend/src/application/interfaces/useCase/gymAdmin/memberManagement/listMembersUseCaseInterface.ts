import { IListMemberInGymRequestDTO, IListMemberRequestDTO, IListMemberResponseDTO } from "../../../../dtos/memberDto/listAllMembersDto";

export interface IListAllMemberUseCase{
    listAllMembers(params:IListMemberInGymRequestDTO):Promise<IListMemberResponseDTO|null>
}