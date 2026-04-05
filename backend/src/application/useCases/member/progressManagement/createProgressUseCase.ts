import { BMIStatus } from "../../../../domain/enums/BMIStatus";
import { ICreateProgressDto } from "../../../dtos/memberDto/progressDto";
import { IProgressRepository } from "../../../interfaces/repository/member/progressRepoInterface";
import { ICreateProgressUseCase } from "../../../interfaces/useCase/member/progressManagement/createProgressUseCaseInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { NOtFoundException } from "../../../constants/exceptions";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { ProgressMapper } from "../../../mappers/member/progressMapper";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";

export class CreateProgressUseCase implements ICreateProgressUseCase {
  constructor(
    private _progressRepository: IProgressRepository,
    private _memberRepository: IMemberRepository,
    private _notificationService: INotificationService,
  ) {}

  async execute(data: ICreateProgressDto, memberId: string): Promise<void> {
    const member = await this._memberRepository.findById(memberId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const heightInMeters =
      member.healthDetails.height.unit === "cm"
        ? member.healthDetails.height.value / 100
        : member.healthDetails.height.unit === "m"
          ? member.healthDetails.height.value
          : member.healthDetails.height.value * 0.3048;

    const weightInKg =
      data.weight.unit === "lbs"
        ? data.weight.value * 0.453592
        : data.weight.value;

    const bmi = +(weightInKg / (heightInMeters * heightInMeters)).toFixed(2);

    let bmiCategory: BMIStatus;

    if (bmi < 18.5) {
      bmiCategory = BMIStatus.UNDERWEIGHT;
    } else if (bmi < 25) {
      bmiCategory = BMIStatus.NORMAL;
    } else if (bmi < 30) {
      bmiCategory = BMIStatus.OVERWEIGHT;
    } else {
      bmiCategory = BMIStatus.OBESE;
    }

    const progressEntity = ProgressMapper.toProgressEntity(
      data,
      memberId,
      bmi,
      bmiCategory,
    );

    const goalWeightStatus = ProgressMapper.toGoalAchieved(
      progressEntity,
      member.healthDetails?.targetWeight,
    );

    if (goalWeightStatus.achieved) {
      await this._notificationService.notify({
        receiverId: member._id!.toString(),
        receiverRole: member.role,
        title: "🎉 Goal Achieved!",
        message: `Congratulations ${member.name}! You have successfully reached your target weight. Keep pushing 💪`,
        type: NotificationType.GOAL_ACHIEVED,
        relatedId: memberId,
        relatedModel: "Progress",
        actionLink: "/member/progress",
      });
    }

    await this._progressRepository.create(progressEntity);
  }
}
