"use server";

import { db } from "@/lib/db";
import { currentUser } from "../auth";

export async function createComemnt(text: string, projectId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error();
  }

  await db.comments.create({
    data: {
      commentText: text,
      parentId: null,
      status: "PENDING",
      userId: user.id!,
      projectId: projectId,
    },
  });

  return { success: true };
}

export async function deleteComment(id: string) {
  await db.comments.delete({
    where: {
      id,
    },
  });

  return { success: true };
}
