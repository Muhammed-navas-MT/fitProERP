import { TrainerSalaryEntity } from "../../../../domain/entities/trainer/salaryPaymentEntity";
import { NotificationType } from "../../../../domain/enums/notificationTypes";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { Roles } from "../../../../domain/enums/roles";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { CreateTrainerSalaryDto } from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISessionRepository } from "../../../interfaces/repository/member/sessionRepoInterface";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import {
  INotificationPayload,
  INotificationService,
} from "../../../interfaces/service/notificationServiceInterface";
import { IGenerateTrainerSalaryUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/generateTrainerSalaryUseCaseInterface";

export class GenerateTrainerSalaryUseCase implements IGenerateTrainerSalaryUseCase {
  constructor(
    private _gymAdminRepository: IGymAdminRepository,
    private _trainerRepository: ITrainerRepository,
    private _trainerSalaryRepository: ITrainerSalaryRepository,
    private _sessionRepository: ISessionRepository,
    private _leaveRepository: ILeaveRepository,
    private _notificationService: INotificationService,
  ) {}

  async execute(data: CreateTrainerSalaryDto): Promise<void> {
    const { gymId } = data;

    const gym = await this._gymAdminRepository.findById(gymId);
    if (!gym) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    const today = new Date();
    let salaryMonth = today.getMonth();
    let salaryYear = today.getFullYear();

    if (salaryMonth === 0) {
      salaryMonth = 12;
      salaryYear -= 1;
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const salaryMonthLabel = `${monthNames[salaryMonth - 1]} ${salaryYear}`;
    const totalDaysInMonth = new Date(salaryYear, salaryMonth, 0).getDate();

    const trainers =
      await this._trainerRepository.findActiveTrainersByGymId(gymId);

    if (!trainers.length) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    const salaryDocuments: TrainerSalaryEntity[] = [];
    const notifications: INotificationPayload[] = [];

    for (const trainer of trainers) {
      if (!trainer._id) continue;

      const existingSalary =
        await this._trainerSalaryRepository.findByTrainerIdAndMonthYear(
          trainer._id,
          salaryMonth,
          salaryYear,
        );

      if (existingSalary) continue;

      let calculatedBaseSalary = trainer.baseSalary || 0;

      if (trainer.createdAt) {
        const joiningDate = new Date(trainer.createdAt);
        const joiningMonth = joiningDate.getMonth() + 1;
        const joiningYear = joiningDate.getFullYear();

        if (joiningMonth === salaryMonth && joiningYear === salaryYear) {
          const workedDays = totalDaysInMonth - joiningDate.getDate() + 1;
          calculatedBaseSalary =
            (trainer.baseSalary / totalDaysInMonth) * workedDays;
        }
      }

      const { totalSessionsAmount, count } =
        await this._sessionRepository.completedSessionsAmountByTrainerIdAndMonthYear(
          trainer._id,
          salaryMonth,
          salaryYear,
        );

      const commissionRate = trainer.commisionRate || 0;

      const commissionAmount = totalSessionsAmount * (commissionRate / 100);

      const rangeStart = new Date(salaryYear, salaryMonth - 1, 1);
      const rangeEnd = new Date(salaryYear, salaryMonth, 0);
      const approvedLeaves =
        await this._leaveRepository.findLeavesByTrainerIdAndDateRange(
          trainer._id,
          rangeStart,
          rangeEnd,
        );

      let totalApprovedLeaveDays = 0;
      for (const leave of approvedLeaves) {
        totalApprovedLeaveDays += leave.leaveCount || 0;
      }

      const allocatedLeaveCount = trainer.allocatedLeaveCount || 0;
      const extraLeaveDays = Math.max(
        totalApprovedLeaveDays - allocatedLeaveCount,
        0,
      );

      const perDaySalary = calculatedBaseSalary / totalDaysInMonth;
      const leaveDeduction = extraLeaveDays * perDaySalary;

      const grossSalary = calculatedBaseSalary + commissionAmount;
      const totalDeduction = leaveDeduction;
      const netSalary = Math.max(grossSalary - totalDeduction, 0);

      const salaryDoc: TrainerSalaryEntity = {
        gymId,
        branchId: trainer.branchId,
        trainerId: trainer._id,
        salaryMonth,
        salaryYear,
        salaryMonthLabel,
        salaryBreakdown: {
          baseSalary: Number(calculatedBaseSalary.toFixed(2)),
          totalSessions: count,
          commissionRate,
          commissionAmount: Number(commissionAmount.toFixed(2)),
          leaveDeduction: Number(leaveDeduction.toFixed(2)),
          bonus: 0,
          otherDeduction: 0,
          manualAdjustment: 0,
        },
        grossSalary: Number(grossSalary.toFixed(2)),
        totalDeduction: Number(totalDeduction.toFixed(2)),
        netSalary: Number(netSalary.toFixed(2)),
        paymentMethod: SalaryPaymentMethod.STRIPE,
        paymentStatus: PaymentStatus.PENDING,
        currency: "INR",
      };

      salaryDocuments.push(salaryDoc);
      notifications.push({
        receiverId: trainer._id.toString(),
        receiverRole: Roles.TRAINER,
        title: "Salary Generated",
        message: `Your salary record for ${salaryMonthLabel} has been generated. Net salary: ₹${Number(
          netSalary.toFixed(2),
        )}.`,
        type: NotificationType.SALARY_GENERATED,
        actionLink: "/trainer/salary",
        relatedId: trainer._id.toString(),
        relatedModel: "TrainerSalary",
      });
    }

    if (!salaryDocuments.length) {
      throw new NOtFoundException("No trainer salary records to generate");
    }
    const generatedCount = salaryDocuments.length;

    await this._trainerSalaryRepository.createMany(salaryDocuments);

    const gymAdminNotification: INotificationPayload = {
      receiverId: gym._id?.toString() as string,
      receiverRole: Roles.GYMADMIN,
      title: "Trainer Salaries Generated",
      message: `${generatedCount} trainer salary record(s) were generated for ${salaryMonthLabel}.`,
      type: NotificationType.SALARY_GENERATED,
      actionLink: "/gym-admin/salary-management",
      relatedModel: "TrainerSalary",
      relatedId: gym._id?.toString() as string,
    };
    await this._notificationService.notifyMany([
      ...notifications,
      gymAdminNotification,
    ]);
  }
}
