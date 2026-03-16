import { DietPlanEntity } from "../../../../domain/entities/member/dietEntity";
import { generateDietPlan } from "../../../../infrastructure/services/dietPlan";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IDietPlanRepository } from "../../../interfaces/repository/member/dietPlanRepoInterface";
import { ICreateDietPlanUseCase } from "../../../interfaces/useCase/member/dietManagement/createDietPlanUseCaseInterface";

export class CreateDietPlanUseCase implements ICreateDietPlanUseCase {
  constructor(
    private _dietPlanRepository: IDietPlanRepository,
    private _memberRepository: IMemberRepository,
  ) {}
  async execute(userId: string): Promise<void> {
    const member = await this._memberRepository.findById(userId);
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const dietPlan = await generateDietPlan(member.healthDetails);
    console.log(JSON.stringify(dietPlan, null, 2));

    const existDietId = await this._dietPlanRepository.findByMemberId(userId);

    if (existDietId) {
      await this._dietPlanRepository.update(
        { days: dietPlan.days },
        existDietId,
      );
    } else {
      const DietPlan: DietPlanEntity = {
        memberId: userId,
        createdAt: new Date(),
        planName: dietPlan.planName,
        goalType: member.healthDetails.fitnessGoal,
        days: dietPlan.days,
      };
      await this._dietPlanRepository.create(DietPlan);
    }
  }
}
