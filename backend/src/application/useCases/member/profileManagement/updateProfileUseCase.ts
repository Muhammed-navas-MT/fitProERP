import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { UpdateMemberProfileDTO } from "../../../dtos/memberDto/profileManagementDtos";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IUpdateProfileUseCase } from "../../../interfaces/useCase/member/profileManagement/updateProfileUseCaseInterface";
import { MemberMapper } from "../../../mappers/memeberMapper";

export class UpdateProfileUseCase implements IUpdateProfileUseCase{
    constructor(
        private _memberRepository:IMemberRepository
    ){};
    async execute(data: UpdateMemberProfileDTO,memberId:string): Promise<void> {
        try {
            const member  = await this._memberRepository.findById(memberId)
            if(!member){
                throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
            };
            const updatedData = MemberMapper.toProfileUpdateMemberEntity(data);
            await this._memberRepository.update(
                updatedData,
                memberId
            )
        } catch (error) {
            throw error;
        }
    }
}