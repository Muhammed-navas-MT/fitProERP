import { reUploadDocument } from "@/services/gymAdmin/reapplyService";
import { useMutation } from "@tanstack/react-query";

export const useReUploadDocument = () => {
  return useMutation({
    mutationFn: (data: FormData) => reUploadDocument(data),
  });
};