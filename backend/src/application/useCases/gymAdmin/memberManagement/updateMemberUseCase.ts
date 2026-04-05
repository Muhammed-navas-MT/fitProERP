import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { Roles } from "../../../../domain/enums/roles";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { UpdateMemberDTO } from "../../../dtos/auth/memberDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { IUpdateMemberUseCase } from "../../../interfaces/useCase/gymAdmin/memberManagement/updateMemberUseCaseInterface";
import { MemberMapper } from "../../../mappers/memeberMapper";

export class UpdateMemberUseCase implements IUpdateMemberUseCase {
  constructor(
    private _memberRepository: IMemberRepository,
    private _notificationService: INotificationService,
  ) {}

  async updateMember(member: UpdateMemberDTO, memberId: string): Promise<void> {
    const existingMember = await this._memberRepository.findById(memberId);
    if (!existingMember) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }
    const memberData = MemberMapper.toUpdateMemberEntity(member);
    await this._memberRepository.update(memberData, memberId);
    await this._notificationService.notifyMany([
      {
        receiverId: existingMember._id!.toString(),
        receiverRole: existingMember.role,
        title: "Profile Updated",
        message: `Your profile has been updated successfully.`,
        type: NotificationType.MEMBER_UPDATED,
        relatedId: memberId,
        relatedModel: "Member",
        actionLink: "/member/profile",
      },
      {
        receiverId: member.trainerId as string,
        receiverRole: Roles.TRAINER,
        title: "Member Updated",
        message: `${existingMember.name}'s details have been updated.`,
        type: NotificationType.MEMBER_UPDATED,
        relatedId: memberId,
        relatedModel: "Member",
        actionLink: "/trainer/members",
      },
    ]);
  }
}
