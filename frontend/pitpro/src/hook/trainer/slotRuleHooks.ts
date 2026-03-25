import {
  createSlotRuleService,
  findSlotRuleService,
  listSlotService,
  updateSlotRuleService,
} from "@/services/trainer/slotRuleServices";
import {
  CreateSlotRuleDTO,
  UpdateSlotRuletDto,
} from "@/types/trainer/slotRuleType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSlotRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSlotRuleDTO) => createSlotRuleService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot_rule"] });
    },
  });
};

export const useFindSlotRule = () => {
  return useQuery({
    queryKey: ["slot_rule"],
    queryFn: () => findSlotRuleService(),
  });
};

export const useUpdateSlotRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { slotRule: UpdateSlotRuletDto; id: string }) =>
      updateSlotRuleService(data.slotRule, data.id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot_rule"] });
    },
  });
};

export const useListSlot = () => {
  return useQuery({
    queryKey: ["slots"],
    queryFn: () => listSlotService(),
  });
};
