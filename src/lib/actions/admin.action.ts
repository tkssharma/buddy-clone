"use server";

import { currentRole } from "../auth";

export const admin = async () => {
  const role = await currentRole();
  if (role) {
    return { status: 200 };
  }
  return { status: 403 };
};
