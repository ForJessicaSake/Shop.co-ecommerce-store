import { z } from "zod";

export const newsLetterSchema = z.object({
  email: z.string().email(),
});

export type NewsLetterSchemaType = z.infer<typeof newsLetterSchema>;
