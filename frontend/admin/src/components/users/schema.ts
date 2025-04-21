import { z } from "zod";

export const inviteAdminUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["ADMIN", "SUPER_ADMIN"], {
    errorMap: () => ({ message: "Enter a valid role" }),
  }),
});

export type InviteAdminUserType = z.infer<typeof inviteAdminUserSchema>;
