import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { Error, ProductType } from "../types";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useGetAllProducts = () => {
  return useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: () => apiClient.get(`/api/products`).then((res) => res.data.data),
  });
};

export const useGetProductDetails = (id?: string) => {
  return useQuery<ProductType>({
    queryKey: ["product-details", id],
    queryFn: () =>
      apiClient.get(`/api/products/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductType) => {
      return apiClient.post("/api/products", JSON.stringify(payload));
    },

    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/");
    },
    onError: (error: Error) => toast.error(error.response.data.message),
  });
};

export const useUpdateProduct = (id?: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductType) =>
      apiClient.patch(`/api/products/edit/${id}`, JSON.stringify(payload)),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/");
    },
    onError: () => toast.error("Product update failed"),
  });
};

export const useDeleteProduct = (id?: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.delete(`/api/products/${id}`),
    onSuccess: () => {
      navigate("/");
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("Product deletion failed"),
  });
};
