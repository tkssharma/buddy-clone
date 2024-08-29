import { auth } from "@/auth";
// getting session for server pages
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
