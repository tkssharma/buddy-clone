import { auth } from "@/auth";
import { db } from "@/lib/db";
import { RequestStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth();
  if (!session) {
    return new NextResponse(JSON.stringify({}), { status: 401 });
  }
  const ownedProjects = await db.projects.findMany({
    where: {
      userId: session.user?.id,
    },
  });
  const assigned =
    (await db.colloberationRequests.findMany({
      where: {
        userId: session.user?.id,
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
    return new NextResponse(
      JSON.stringify([...ownedProjects, ...assignedProjects]),
      { status: 200 },
    );
  }
  return new NextResponse(JSON.stringify([...ownedProjects]), { status: 200 });
}
