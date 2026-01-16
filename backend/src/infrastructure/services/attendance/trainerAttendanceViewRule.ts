import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { BadRequestException } from "../../../application/constants/exceptions";
import { IAttendanceViewRule } from "../../../application/interfaces/service/attendanceViewRule";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";

export class TrainerAttendanceViewRule implements IAttendanceViewRule {
  constructor(
    private readonly trainerRepository: ITrainerRepository
  ) {}

  async resolveBranchId(userId: string): Promise<string[]> {
    const trainer = await this.trainerRepository.findById(userId);

    if (!trainer) {
      throw new BadRequestException(TrainerError.TRAINER_NOT_FOUND);
    }

    return [trainer.branchId as string];
  }
}
