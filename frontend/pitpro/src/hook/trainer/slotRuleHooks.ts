import { createSlotRuleService } from "@/services/trainer/slotRuleServices";
import { CreateSlotRuleDTO } from "@/types/trainer/slotRuleType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSlotRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSlotRuleDTO) => createSlotRuleService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot_rule"] });
    },
  });
};