import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email required",
  }),
  password: z.string().min(6, {
    message: "email required",
  }),
});
