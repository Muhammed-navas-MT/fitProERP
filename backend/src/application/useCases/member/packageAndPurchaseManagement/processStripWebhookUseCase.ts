import Stripe from "stripe";
import { IMemberProcessStripeWebhookUseCase } from "../../../interfaces/useCase/member/packageAndPurchaseManagement/processStripeWebhookUseCaseInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";

import {
  ForbiddenException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages";
import { Status } from "../../../../domain/enums/status";

import { mapPackageToMemberUpdate } from "../../../mappers/member/mapPackageToMemberUpdate";
import { mapStripeSessionToRevenue } from "../../../mappers/gymAdmin/mapStripeSessionToRevenue";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { Roles } from "../../../../domain/enums/roles";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";

export class MemberProcessStripeWebhookUseCase implements IMemberProcessStripeWebhookUseCase {
  constructor(
    private _gymAdminRevenueRepository: IGymAdminRevenueRepository,
    private _memberRepository: IMemberRepository,
    private _packageRepository: IPackageRespository,
    private _notificationService: INotificationService,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    if (event.type !== "checkout.session.completed") return;

    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;
    const branchId = session.metadata?.branchId;
    const gymId = session.metadata?.gymId;

    if (!userId || !planId || !branchId || !gymId) {
      throw new ForbiddenException("Stripe session metadata missing");
    }

    const alreadyExists =
      await this._gymAdminRevenueRepository.existsBySessionId(session.id);

    if (alreadyExists) return;

    const pkg = await this._packageRepository.findById(planId);
    if (!pkg) {
      throw new NOtFoundException(PackageErrorMessage.NOT_FOUND);
    }

    const member = await this._memberRepository.findById(userId);
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const updatedMemberData = mapPackageToMemberUpdate(
      planId,
      pkg.name,
      pkg.sessionCount,
      pkg.price,
      pkg.durationInDays,
    );

    await this._memberRepository.update(
      {
        ...updatedMemberData,
        status: Status.ACTIVE,
      },
      userId,
    );

    const revenue = mapStripeSessionToRevenue({
      session,
      gymId,
      branchId,
      userId,
      planId,
    });

    await this._gymAdminRevenueRepository.create(revenue);
    const notifications = [
      {
        receiverId: userId,
        receiverRole: Roles.MEMBER,
        title: "Package Activated",
        message: `Your ${pkg.name} package has been purchased successfully and your membership is now active.`,
        type: NotificationType.PAYMENT_SUCCESS,
        relatedId: planId,
        relatedModel: "Package",
        actionLink: "/member/packages",
      },
    ];

    if (member.trainerId) {
      notifications.push({
        receiverId: member.trainerId.toString(),
        receiverRole: Roles.TRAINER,
        title: "Member Activated",
        message: `${member.name} has purchased a package and is now an active member.`,
        type: NotificationType.GENERAL,
        relatedId: userId,
        relatedModel: "Member",
        actionLink: "/trainer/members",
      });
      notifications.push({
        receiverId: gymId,
        receiverRole: Roles.GYMADMIN,
        title: "New Active Member",
        message: `${member.name} has purchased the ${pkg.name} package and is now active.`,
        type: NotificationType.PAYMENT_SUCCESS,
        relatedId: userId,
        relatedModel: "Member",
        actionLink: "/gym-admin/members",
      });
    }

    await this._notificationService.notifyMany(notifications);
  }
}
