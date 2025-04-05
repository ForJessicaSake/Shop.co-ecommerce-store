import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { ProductType } from "../types/product";
import { apiClient } from "../api-client";
import { toast } from "sonner";
import { ProductReviewSchemaType } from "../../components/product/schema";

type GetProductProps = {
  topSelling?: boolean;
  size?: string;
  style?: string;
  price?: number[];
};
export const useGetProducts = (props?: GetProductProps) => {
  const { topSelling, size, style, price } = props ?? {};

  const params = new URLSearchParams();
  if (topSelling !== undefined) params.append("topSelling", String(topSelling));
  if (size !== undefined) params.append("size", size);
  if (style !== undefined) params.append("style", style);
  if (price !== undefined) params.append("minPrice", price[0].toString());
  if (price !== undefined) params.append("maxPrice", price[1].toString());

  const queryString = params.toString();

  return useQuery<ProductType[]>({
    queryKey: ["products", topSelling, size, style, price],
    queryFn: () =>
      apiClient
        .get(`/api/products${queryString ? `?${queryString}` : ""}`)
        .then((res) => res.data.data),
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

export const useCreateProductReview = () => {
  const queryClient = new QueryClient();
  const session = localStorage.getItem("user_id");
  const clientId = session && JSON.parse(session);

  return useMutation({
    mutationFn: (data: ProductReviewSchemaType) => {
      const payload = { ...data, clientId, rating: 4 };
      return apiClient.post("/api/reviews", payload);
    },
    onSuccess: () => {
      toast.success("Product review added successfully");
      queryClient.invalidateQueries({ queryKey: ["product-reviews"] });
    },
    onError: () => toast.error("Unable to add review"),
  });
};

export const useGetProductReviews = (id?: string) => {
  return useQuery({
    queryKey: ["product-reviews", id],
    queryFn: () =>
      apiClient.get(`/api/reviews/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });
};
