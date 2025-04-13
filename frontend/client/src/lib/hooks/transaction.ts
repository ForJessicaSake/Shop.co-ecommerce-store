import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { toast } from "sonner";
import { GenerateTransactionReferencePayloadProps } from "../types";

export const useGenerateTransactionReference = () => {
  return useMutation({
    mutationFn: (payload: GenerateTransactionReferencePayloadProps) =>
      apiClient.post("/auth/api/initilizeTransaction", payload),
    onSuccess: () => {
      toast.success("Reference generated successfully");
    },
    onError: () => {
      toast.error("Unable to generate reference");
    },
  });
};

export const useVerifyTransaction = (reference: string | null) => {
  return useQuery({
    queryKey: ["verify-transaction", reference],
    queryFn: () =>
      apiClient
        .get(`/auth/api/verifyTransaction/${reference}`)
        .then((res) => res.data.data),
    enabled: !!reference,
  });
};
