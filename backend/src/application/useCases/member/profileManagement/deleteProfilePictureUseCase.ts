import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IDeleteProfilePictureUseCase } from "../../../interfaces/useCase/member/profileManagement/deleteProfilePictureUseCaseInterface";

export class DeleteProfilePictureUseCase implements IDeleteProfilePictureUseCase {
    constructor(
        private _memberRepository:IMemberRepository
    ){};

    async execute(memberId: string): Promise<void> {
        try {
            const member = await this._memberRepository.findById(memberId);
            if(!member){
                throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
            };
            await this._memberRepository.update(
                {profileImg:""},
                memberId
            )
        } catch (error) {
            throw error
        }
    }
}