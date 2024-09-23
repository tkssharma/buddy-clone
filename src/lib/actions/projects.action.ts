"use server";

import { ProjectSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { currentUser } from "../auth";

export const createProject = async (values: z.infer<typeof ProjectSchema>) => {
  const user = await currentUser();
  const validation = ProjectSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid data Provided" };
  }
  const { name, description, type } = validation.data;
  const existingproject = await db.projects.findFirst({
    where: {
      name: name,
    },
  });
  if (existingproject) {
    return { error: `project already exists with name ${name} ` };
  }

  await db.projects.create({
    data: {
      name,
      type,
      description,
      userId: user?.id!,
    },
  });
  return { success: "project created successfully" };
};
