import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { UserType } from "../types";
import { Error } from "../types";

export const useCreateClientAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: UserType) =>
      apiClient.post("/api/auth/signup", JSON.stringify(payload)),
    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/login");
    },
    onError: (error: Error) => toast.error(error.response.data.message),
  });
};

export const useLoginClientAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: UserType) =>
      apiClient
        .post("/api/auth/login", JSON.stringify(payload))
        .then((res) => res.data.data),
    onSuccess: (data) => {
      toast.success("Login successful");
      navigate("/cart");
      localStorage.setItem("user_id", JSON.stringify(data.userId));
      localStorage.setItem("token", JSON.stringify(data.token));
    },
    onError: (error: Error) => toast.error(error.response.data.message),
  });
};

export const useClient = (id?: string) => {
  return useQuery({
    queryKey: ["client-details"],
    queryFn: () =>
      apiClient.get(`/api/auth/client/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      apiClient.post("/api/auth/forgotPassword", payload),
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error: Error) => toast.error(error.response.data.message),
  });
};
