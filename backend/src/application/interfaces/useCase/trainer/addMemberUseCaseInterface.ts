import { IAddMemberDTO } from "../../../dtos/auth/memberDto";
import { IListMemberRequestDTO, IListMemberResponseDTO } from "../../../dtos/memberDto/listAllMembersDto";

export interface IAddMemberUseCase{
    signUp(data:IAddMemberDTO):Promise<void>;
    listAllTrainers(params:IListMemberRequestDTO):Promise<IListMemberResponseDTO|null>
}