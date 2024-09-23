"use server";

import { ProjectSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { currentUser } from "../auth";
import { Project } from "next/dist/build/swc";

enum RequestStatus {
  APPROVED = "APPROVED",
  PENDING = " PENDING",
  REJECTED = "REJECTED",
}
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

export async function listUserProjects() {
  const user = await currentUser();
  const ownedProjects = await db.projects.findMany({
    where: {
      userId: user?.id,
    },
  });
  const assigned =
    (await db.colloberationRequests.findMany({
      where: {
        userId: user?.id,
        status: RequestStatus.APPROVED,
      },
    })) || [];
  if (assigned.length > 0) {
    const ids = assigned.map((i) => i.projectId);
    const assignedProjects = await db.projects.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return [...ownedProjects, ...assignedProjects];
  }
  return [...ownedProjects];
}
