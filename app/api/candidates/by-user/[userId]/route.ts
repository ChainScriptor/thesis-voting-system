// app/api/candidates/by-user/[userId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const userIdStr = pathParts[pathParts.length - 1];
  const userId = parseInt(userIdStr, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    const candidate = await prisma.candidate.findFirst({
      where: { user: { id: userId } },
      select: { id: true },
    });

    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    return NextResponse.json({ id: candidate.id });
  } catch (err) {
    console.error("GET /api/candidates/by-user/[userId] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
