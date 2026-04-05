import { DietPlanEntity } from "../../../../domain/entities/member/dietEntity";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { Roles } from "../../../../domain/enums/roles";
import { generateDietPlan } from "../../../../infrastructure/services/dietPlan";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IDietPlanRepository } from "../../../interfaces/repository/member/dietPlanRepoInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { ICreateDietPlanUseCase } from "../../../interfaces/useCase/member/dietManagement/createDietPlanUseCaseInterface";

export class CreateDietPlanUseCase implements ICreateDietPlanUseCase {
  constructor(
    private _dietPlanRepository: IDietPlanRepository,
    private _memberRepository: IMemberRepository,
    private _notificationSerive: INotificationService,
  ) {}
  async execute(userId: string): Promise<void> {
    const member = await this._memberRepository.findById(userId);
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const dietPlan = await generateDietPlan(member.healthDetails);

    const existDietId = await this._dietPlanRepository.findByMemberId(userId);

    if (existDietId) {
      await this._dietPlanRepository.update(
        { days: dietPlan.days },
        existDietId,
      );
      await this._notificationSerive.notify({
        receiverId: userId,
        receiverRole: Roles.MEMBER,
        title: "Diet Plan Ready 🥗",
        message:
          "Your personalized diet plan has been created. Start following it to achieve your fitness goals!",
        type: NotificationType.DIET_PLAN_CREATED,
        relatedId: existDietId,
        relatedModel: "DietPlan",
        actionLink: "/member/diet_plans",
      });
    } else {
      const DietPlan: DietPlanEntity = {
        memberId: userId,
        createdAt: new Date(),
        planName: dietPlan.planName,
        goalType: member.healthDetails.fitnessGoal,
        days: dietPlan.days,
      };
      const dietPlanId = await this._dietPlanRepository.create(DietPlan);
      await this._notificationSerive.notify({
        receiverId: userId,
        receiverRole: Roles.MEMBER,
        title: "Diet Plan Ready 🥗",
        message:
          "Your personalized diet plan has been created. Start following it to achieve your fitness goals!",
        type: NotificationType.DIET_PLAN_CREATED,
        relatedId: dietPlanId,
        relatedModel: "DietPlan",
        actionLink: "/member/diet_plans",
      });
    }
  }
}
