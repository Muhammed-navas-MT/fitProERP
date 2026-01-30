import { IListMemberRequestDTO, IListMemberResponseDTO } from "../../../../dtos/memberDto/listAllMembersDto";

export interface IListMemberUseCase{
    listAllMembers(params:IListMemberRequestDTO):Promise<IListMemberResponseDTO|null>
}