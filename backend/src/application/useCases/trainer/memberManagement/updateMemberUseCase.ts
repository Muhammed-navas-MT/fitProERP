import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { Roles } from "../../../../domain/enums/roles";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { IUpdateMemberUseCase } from "../../../interfaces/useCase/trainer/memberManagement/updateMemberUseCaseInterface";

export class UpdateMemberUseCase implements IUpdateMemberUseCase {
  constructor(
    private readonly _memberRepository: IMemberRepository,
    private readonly _notificationService: INotificationService,
  ) {}

  async updateMember(
    member: { trainerId: string; branchId: string },
    memberId: string,
  ): Promise<boolean> {
    const existingMember = await this._memberRepository.findById(memberId);

    if (!existingMember) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const isBranchChanged =
      existingMember.branchId?.toString() !== member.branchId;

    if (
      existingMember.branchId?.toString() === member.branchId &&
      existingMember.trainerId.toString() === member.trainerId
    ) {
      return false;
    }

    await this._memberRepository.update(member, memberId);

    await this._notificationService.notify({
      receiverId: existingMember.gymId.toString(),
      receiverRole: Roles.GYMADMIN,
      title: "Member Updated",
      message: `${existingMember.name}'s trainer has been updated successfully.`,
      type: NotificationType.GENERAL,
      relatedId: memberId,
      relatedModel: "Member",
      actionLink: "/gym-admin/members",
    });

    return isBranchChanged;
  }
}
