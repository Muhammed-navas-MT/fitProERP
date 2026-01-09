import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IUploadProfileImageUseCase } from "../../../interfaces/useCase/member/profileManagement/uploadProfilePictureUseCaseInterface";

export class UploadProfilePictureUseCase implements IUploadProfileImageUseCase{
    constructor(
        private _memberRepository:IMemberRepository
    ){};

    async execute(memberId: string, image: string): Promise<string> {
        try {
            const member = await this._memberRepository.findById(memberId);
            if(!member){
                throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
            };
            await this._memberRepository.update(
                {profileImg:image},
                memberId
            )
            return image;
        } catch (error) {
            throw error
        }
    }
}