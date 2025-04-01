import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  image: z.string().min(1, { message: "Product image is required" }),
  price: z.coerce.number().min(1, { message: "Product price is required" }),
  size: z.string(),
  description: z.string().optional(),
  topSelling: z.preprocess((val) => val === "true", z.boolean().default(false)),
  quantity: z.coerce.number().default(1),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

export const productReviewschema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  review: z.string().min(1, { message: "Review is required" }),
  rating: z.coerce
    .number()
    .min(1, { message: "Rating is required" })
    .default(1),
});

export type ProductReviewSchemaType = z.infer<typeof productReviewschema>;

export type ProductReviewType = {
  id: string;
  name: string;
  clientId: string;
  product: string[];
  review: string;
  rating: number;
};
