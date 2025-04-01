import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { toast } from "sonner";
import { NewsLetterPayload } from "../types";

export const useSubscribeToNewsLetter = () => {
  return useMutation({
    mutationFn: (payload: NewsLetterPayload) =>
      apiClient.post("/api/newsletter", payload),
    onSuccess: () =>
      toast.success("Subscription successful! Check your inbox for updates."),
    onError: () => toast.error("Subscription failed. Please try again."),
  });
};
