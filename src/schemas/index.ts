import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email required",
  }),
  password: z.string().min(6, {
    message: "email required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "email required",
  }),
  password: z.string().min(6, {
    message: "email required",
  }),
  name: z.string().min(1, {
    message: "name required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
