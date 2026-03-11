import { IGymAdminExpenseEntity } from "../../../domain/entities/gymAdmin/expensessEntity";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import {
  IPopulatedExpense,
  MonthlyExpenseSummary,
} from "../../../infrastructure/repository/databaseConfigs/types/populatedExpenseTypes";
import {
  ICreateExpenseRequestDto,
  IExpenseDetailResponseDto,
  IExpenseResponseDto,
  IListExpenseRequestDto,
  IListExpenseResponseDto,
} from "../../dtos/gymAdminDto/expenseDtos";

export function mapCreateExpenseDtoToEntity(
  dto: ICreateExpenseRequestDto,
  gymId: string,
): IGymAdminExpenseEntity {
  return {
    gymId: gymId,
    branchId: dto.branchId,
    expenseType: dto.expenseType,
    description: dto.description || "",
    createdBy: dto.createdBy,
    createdByModel: dto.createdByModel,
    amount: dto.amount,
    status: PaymentStatus.PAID,
    paymentMethod: dto.paymentMethod,
    paymentDate: dto.paymentDate,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function mapExpenseToDetailResponse(
  expense: IPopulatedExpense,
): IExpenseDetailResponseDto {
  return {
    id: expense.id,

    branch: {
      branchName: expense.branch.branchName,
      city: expense.branch.city,
      pincode: expense.branch.pincode,
    },

    expenseType: expense.expenseType,
    description: expense.description,

    createdBy: {
      name: expense.createdBy.name,
      email: expense.createdBy.email,
      model: expense.createdBy.model,
    },

    amount: expense.amount,
    paymentMethod: expense.paymentMethod,
    paymentDate: expense.paymentDate,
    status: expense.status,
    createdAt: expense.createdAt,
  };
}

export function mapExpenseListResponse(
  data: IPopulatedExpense[],
  params: IListExpenseRequestDto,
  total: number,
  expenseSummary: MonthlyExpenseSummary[],
  thisMonthTotalExpense: number,
  grandTotal: number,
): IListExpenseResponseDto {
  const mappedExpenses: IExpenseDetailResponseDto[] = data.map((expense) =>
    mapExpenseToDetailResponse(expense),
  );

  const now = new Date();

  const last12Months: MonthlyExpenseSummary[] = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const monthLabel = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const existing = expenseSummary.find((m) => m.month === monthLabel);

    last12Months.push(
      existing || {
        month: monthLabel,
        Rent: 0,
        Utilities: 0,
        Maintenance: 0,
        Equipment: 0,
        Marketing: 0,
        TrainerSalary: 0,
        Other: 0,
      },
    );
  }

  return {
    limit: params.limit,
    page: params.page,
    search: params.search,
    total,
    totalPages: Math.ceil(total / params.limit),
    expense: mappedExpenses,
    expenseSummary: last12Months,
    thisMonthTotalExpense,
    grandTotal,
  };
}

export function mapExpenseToResponse(
  expense: IGymAdminExpenseEntity,
): IExpenseResponseDto {
  return {
    id: expense.id?.toString() as string,
    amount: expense.amount,
    branchId: expense.branchId,
    createdBy: expense.createdBy,
    expenseType: expense.expenseType,
    paymentDate: expense.paymentDate,
    status: expense.status,
    description: expense.description,
  };
}
