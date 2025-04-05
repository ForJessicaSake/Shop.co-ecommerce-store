import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { UserType } from "../types";
import { Error } from "../types";

export const useCreateClientAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: UserType) =>
      apiClient.post("/auth/api/signup", JSON.stringify(payload)),
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
        .post("/auth/api/login", JSON.stringify(payload))
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
