import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiClient } from "../api-client";
import { Error, AdminUserType } from "../types";
import { toast } from "sonner";

export const useCreateAdminAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: AdminUserType) =>
      apiClient.post("/api/auth/admin/signup", JSON.stringify(payload)),
    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/admin/login");
    },
    onError: (error: Error) => toast.error(error.response.data.message),
  });
};

export const useLoginAdminAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: AdminUserType) =>
      apiClient
        .post("/api/auth/admin/login", JSON.stringify(payload))
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success("Login successful");
      navigate("/");
      localStorage.setItem("admin_id", JSON.stringify(data.data));
    },
    onError: (error: Error) => {
      toast.error(error?.response?.data?.message ?? "Unable to login");
    },
  });
};
