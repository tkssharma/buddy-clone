"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "../db";

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid data Provided" };
  }
  const { email, password, name } = validation.data;
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "User already exists" };
  }
  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      password: hashPassword,
    },
  });
  return { success: "User created successfully" };
};
