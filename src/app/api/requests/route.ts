import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth();
  if (!session) {
    return new NextResponse(JSON.stringify({}), { status: 401 });
  }
  const userId = session?.user?.id;
  const projects = db.projects.findMany({
    where: {
      userId: userId,
    },
  });
  return new NextResponse(JSON.stringify(projects), { status: 200 });
}
