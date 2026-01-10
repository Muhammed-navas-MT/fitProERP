import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { MemberDTO } from "../../../dtos/memberDto/listAllMembersDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IViewProfileUseCase } from "../../../interfaces/useCase/member/profileManagement/viewProfileUseCaseInterface";
import { MemberMapper } from "../../../mappers/memeberMapper";

export class ViewMemberProfileUseCase implements IViewProfileUseCase{
    constructor(
        private _memberRepository:IMemberRepository
    ){}
    async execute(memberId: string): Promise<MemberDTO> {
        try {
           const member = await this._memberRepository.findById(memberId);
           if(!member){
            throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
           };
           const memberData = MemberMapper.toMemberDTO(member);
           return memberData
        } catch (error) {
            throw error
        }
    }
}