
import {
  createExpenseService,
  updateExpenseService,
  listExpenseService,
  findExpenseService,
  findExpenseDetailService,
} from "@/services/gymAdmin/expenseServices";

import { ExpenseFormData, UpdateExpenseFormData } from "@/validation/expenseValidationSchema";
import { ExpenseType } from "@/constants/expenseTypes";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

export const expenseQueryKeys = {
  all: ["expenses"] as const,

  list: (page: number, search: string, expenseType?: ExpenseType) =>
    [...expenseQueryKeys.all, page, search, expenseType] as const,

  detail: (expenseId: string) =>
    [...expenseQueryKeys.all, expenseId] as const,

  detailFull: (expenseId: string) =>
    [...expenseQueryKeys.all, "detail", expenseId] as const,
};


export const useListExpenses = (
  page: number,
  search: string,
  expenseType?: ExpenseType
) => {
  return useQuery({
    queryKey: expenseQueryKeys.list(page, search, expenseType),
    queryFn: () => listExpenseService(page, search, expenseType),
    placeholderData: keepPreviousData,
  });
};


export const useFindExpense = (expenseId: string) => {
  return useQuery({
    queryKey: expenseQueryKeys.detail(expenseId),
    queryFn: () => findExpenseService(expenseId),
    enabled: !!expenseId,
  });
};


export const useFindExpenseDetail = (expenseId: string) => {
  return useQuery({
    queryKey: expenseQueryKeys.detailFull(expenseId),
    queryFn: () => findExpenseDetailService(expenseId),
    enabled: !!expenseId,
  });
};


export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExpenseFormData) =>
      createExpenseService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: expenseQueryKeys.all,
      });
    },
  });
};


export const useUpdateExpense = (expenseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateExpenseFormData) =>
      updateExpenseService(data, expenseId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: expenseQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: expenseQueryKeys.detail(expenseId),
      });

      queryClient.invalidateQueries({
        queryKey: expenseQueryKeys.detailFull(expenseId),
      });
    },
  });
};