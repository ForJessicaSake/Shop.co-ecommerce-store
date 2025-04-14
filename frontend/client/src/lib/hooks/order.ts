import { useQuery } from "@tanstack/react-query";
import { apiClient, getCurrentUser } from "../api-client";

export const useGetOrders = () => {
  const userId = getCurrentUser();
  return useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      apiClient.get(`/auth/api/orders/${userId}`).then((res) => res.data.data),
    enabled: !!userId,
  });
};
