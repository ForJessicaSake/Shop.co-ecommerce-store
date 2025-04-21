import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiClient } from "../api-client";
import { Error, AdminUserType } from "../types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

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
        .then((res) => res.data.data),
    onSuccess: (data) => {
      toast.success("Login successful");
      navigate("/");
      localStorage.setItem("user_id", JSON.stringify(data.userId));
      localStorage.setItem("token", JSON.stringify(data.token));
    },
    onError: (error: Error) => {
      toast.error(error?.response?.data?.message ?? "Unable to login");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      apiClient.post("/api/auth/admin/forgotPassword", payload),
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error: Error) => toast.error(error.response.data.message),
  });
};

export const useInviteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; role: string }) =>
      apiClient.post("/api/auth/admin/invite", payload),
    onSuccess: () => {
      toast.success("Invitation sent successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error) => {
      toast.error(
        error?.response?.data?.message ?? "Unable to send invitation"
      );
    },
  });
};

export const useGetAllAdminUsers = () => {
  return useQuery<AdminUserType[]>({
    queryKey: ["admin-users"],
    queryFn: () =>
      apiClient.get("/api/auth/admin/users").then((res) => res.data.data),
  });
};

export const useDisableUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      apiClient.post("/api/auth/admin/disableUser", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("user successfully disabled");
    },
    onError: (error: Error) => {
      toast.error(error?.response?.data?.message ?? "Unable to disable user");
    },
  });
};

export const useEnableUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      apiClient.post("/api/auth/admin/enableUser", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("user successfully enabled");
    },
    onError: (error: Error) => {
      toast.error(error?.response?.data?.message ?? "Unable to enable user");
    },
  });
};
