import { useQuery } from "@tanstack/react-query";
import { apiClient, getCurrentUser } from "../api-client";

export const useGetOrders = () => {
  const userId = getCurrentUser();
  return useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      apiClient.get(`/api/auth/orders/${userId}`).then((res) => res.data.data),
    enabled: !!userId,
  });
};
