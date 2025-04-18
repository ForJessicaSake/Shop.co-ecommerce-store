import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { Transaction } from "../types";

export const useGetTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () =>
      apiClient
        .get("/api/auth/admin/transactions")
        .then((res) => res.data.data),
  });
};
