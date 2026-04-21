import { IBaseRepository } from "../base/baseRepo";
import { TrainerEntity } from "../../../../domain/entities/trainer/trainerEntity";
import { IListTrainerRequestDTO } from "../../../dtos/trainerDto/listAllTrainerDto";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import { StripeAccountStatus } from "../../../../domain/enums/stripeAccountStatus";

export interface ITrainerRepository extends IBaseRepository<TrainerEntity> {
  findByEmail(email: string): Promise<TrainerEntity | null>;
  listAllTrainers(params: IListTrainerRequestDTO): Promise<{
    trainers: (TrainerEntity & { branchName: string })[];
    total: number;
  }>;
  countTrainersByGymId(gymId: string): Promise<number>;
  countByBranchId(branchId: string): Promise<number>;
  listAllActiveTrainers(gymId: string): Promise<TrainerEntity[]>;
  findActiveTrainersByBranchAndGym(
    branchId: string,
    gymId: string,
  ): Promise<TrainerEntity[]>;
  findActiveTrainersByBranch(branchId: string): Promise<TrainerEntity[]>;
  countActiveTrainersByBranch(branchId: string): Promise<number>;
  findActiveTrainersByBranchExcludingTrainer(
    branchId: string,
    trainerId: string,
  ): Promise<{ id: string }[]>;
  countByGymId(gymId: string): Promise<number>;
  countActiveByGymId(gymId: string): Promise<number>;
  findByEmailAndGymId(data: {
    email: string;
    gymId: string;
  }): Promise<TrainerEntity | null>;
  findActiveTrainersByGymId(gymId: string): Promise<TrainerEntity[]>;
  getSalaryConfigByTrainerId(trainerId: string): Promise<TrainerEntity | null>;

  updateSalaryConfig(
    trainerId: string,
    data: {
      paymentType?: SalaryPaymentMethod;
      isPayoutEnabled?: boolean;
      stripeConnectedAccountId?: string;
      stripeAccountStatus?: StripeAccountStatus;
      stripeOnboardingCompleted?: boolean;
      accountHolderName?: string;
      bankName?: string;
      bankLast4?: string;
      ifscCode?: string;
      upiId?: string;
    },
  ): Promise<TrainerEntity | null>;
}
