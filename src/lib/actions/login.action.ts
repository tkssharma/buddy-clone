"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { error } from "console";
import { z } from "zod";
const DEFAULT_LOGIN_REDIRECT = "/";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const loginUser = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null,
) => {
  const validation = LoginSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid data Provided" };
  }
  const { email, password } = validation.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { errors: "Email does not exists" };
  }
  try {
    // check with auth now
    console.log(email, password);

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "success" };
  } catch (err) {
    console.log(err);
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Creds" };
        default:
          return { error: "An error occured" };
      }
    }
    throw error;
  }
};
