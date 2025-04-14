import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { toast } from "sonner";
import { NewsLetterPayload } from "../types";

export const useSubscribeToNewsLetter = () => {
  return useMutation({
    mutationFn: (payload: NewsLetterPayload) =>
      apiClient.post("/api/newsletter", payload),
    onSuccess: () =>
      toast.success("Subscription to newsletter was successful!"),
    onError: () => toast.error("Subscription failed. Please try again."),
  });
};
