"use server";

import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "../token";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validation = ResetSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid data Provided" };
  }
  const { email } = validation.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email user does not exists" };
  }
  const passwordToken = await generatePasswordResetToken(email);

  // send email
  // send email with this token
  // which can be used in rest password form //
  // ! TBD TODO
  return { success: "User created successfully" };
};
