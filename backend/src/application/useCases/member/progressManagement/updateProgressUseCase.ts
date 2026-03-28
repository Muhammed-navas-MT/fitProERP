import { BMIStatus } from "../../../../domain/enums/BMIStatus";
import { ProgressError } from "../../../../presentation/shared/constants/messages/progressMassages";
import { IUpdateProgressDto } from "../../../dtos/memberDto/progressDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IProgressRepository } from "../../../interfaces/repository/member/progressRepoInterface";
import { IUpdateProgressUseCase } from "../../../interfaces/useCase/member/progressManagement/updateProgressUseCaseInterface";
import { ProgressMapper } from "../../../mappers/member/progressMapper";

export class UpdateProgressUseCase implements IUpdateProgressUseCase {
  constructor(
    private _progressRepository: IProgressRepository,
    private _memberRepository: IMemberRepository,
  ) {}

  async execute(data: IUpdateProgressDto, progressId: string): Promise<void> {
    const existingProgress =
      await this._progressRepository.findById(progressId);

    if (!existingProgress) {
      throw new Error(ProgressError.NOT_FOUND);
    }

    const member = await this._memberRepository.findById(
      existingProgress.memberId,
    );

    if (!member) {
      throw new Error(ProgressError.MEMBER_NOT_FOUND);
    }

    const weight = data.weight ?? existingProgress.weight;

    let bmi = existingProgress.bmi;
    let bmiCategory = existingProgress.bmiCategory;

    if (data.weight) {
      const memberHeight = member.healthDetails.height;

      if (!memberHeight?.value || !memberHeight?.unit) {
        throw new Error(ProgressError.INVALID_MEMBER_HEIGHT);
      }

      const heightInMeters =
        memberHeight.unit === "cm"
          ? memberHeight.value / 100
          : memberHeight.unit === "m"
            ? memberHeight.value
            : memberHeight.unit === "ft"
              ? memberHeight.value * 0.3048
              : 0;

      if (heightInMeters <= 0) {
        throw new Error(ProgressError.INVALID_MEMBER_HEIGHT);
      }

      const weightInKg =
        weight.unit === "lbs" ? weight.value * 0.453592 : weight.value;

      bmi = +(weightInKg / (heightInMeters * heightInMeters)).toFixed(2);

      if (bmi < 18.5) {
        bmiCategory = BMIStatus.UNDERWEIGHT;
      } else if (bmi < 25) {
        bmiCategory = BMIStatus.NORMAL;
      } else if (bmi < 30) {
        bmiCategory = BMIStatus.OVERWEIGHT;
      } else {
        bmiCategory = BMIStatus.OBESE;
      }
    }

    const updatedEntity = ProgressMapper.toUpdateProgressEntity(
      existingProgress,
      data,
      bmi,
      bmiCategory,
    );

    await this._progressRepository.update(updatedEntity, progressId);
  }
}
