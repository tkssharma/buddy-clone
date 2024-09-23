import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth();
  if (!session) {
    return new NextResponse(JSON.stringify({}), { status: 401 });
  }
  console.log(session);
  console.log(session.user);
  const userId = session?.user?.id;
  const projects = await db.projects.findMany({
    where: {
      userId: userId,
    },
  });
  return new NextResponse(JSON.stringify(projects), { status: 200 });
}
