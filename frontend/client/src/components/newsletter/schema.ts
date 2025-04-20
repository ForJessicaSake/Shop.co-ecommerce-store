import { z } from "zod";

export const newsLetterSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});

export type NewsLetterSchemaType = z.infer<typeof newsLetterSchema>;
