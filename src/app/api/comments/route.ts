import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth();
  return new NextResponse(JSON.stringify(session), { status: 200 });
}
