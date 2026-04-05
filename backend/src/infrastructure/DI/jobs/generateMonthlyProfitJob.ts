import { GenerateMonthlyProfitUseCase } from "../../../application/useCases/gymAdmin/profitManagement/generateMonthlyProfitUseCase";
import { CreateNotificationUseCase } from "../../../application/useCases/shared/notificationManagement/createNotificationUseCase";
import { GenerateMonthlyProfitJob } from "../../../presentation/jobs/generateMonthlyProfitJob";
import { branchModel } from "../../repository/databaseConfigs/models/branchModel";
import { gymAdminExpenseModel } from "../../repository/databaseConfigs/models/expenseModel";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { gymAdminProfitModel } from "../../repository/databaseConfigs/models/gymAdminProfitModel";
import { notificationModel } from "../../repository/databaseConfigs/models/notificationModel";
import { gymAdminRevenueModel } from "../../repository/databaseConfigs/models/revenueModel";
import { BranchRepository } from "../../repository/gymAdmin/branchRepo";
import { GymAdminExpenseRepository } from "../../repository/gymAdmin/expenseRepo";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { ProfitRepository } from "../../repository/gymAdmin/profitRepo";
import { GymAdminRevenueRepository } from "../../repository/gymAdmin/revenueRepo";
import { NotificationRepository } from "../../repository/shared/notificationRepo";
import { NotificationService } from "../../services/notificationService";
import { SocketService } from "../../services/socketService";

const profitRepository = new ProfitRepository(gymAdminProfitModel);
const revenueRepository = new GymAdminRevenueRepository(gymAdminRevenueModel);
const expenseRepository = new GymAdminExpenseRepository(gymAdminExpenseModel);
const branchRepository = new BranchRepository(branchModel);
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const socketService = new SocketService();
const noticationRepository = new NotificationRepository(notificationModel);
const notificationUseCase = new CreateNotificationUseCase(
  noticationRepository,
  socketService,
);
const notificationService = new NotificationService(notificationUseCase);
const generateMonthlyProfitUseCase = new GenerateMonthlyProfitUseCase(
  profitRepository,
  expenseRepository,
  revenueRepository,
  gymAdminRepository,
  branchRepository,
  notificationService,
);

export const injectedIGenerateMonthlyProfitJob = new GenerateMonthlyProfitJob(
  generateMonthlyProfitUseCase,
);
