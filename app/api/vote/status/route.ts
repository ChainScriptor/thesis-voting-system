// app/api/vote/status/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // 1) Παίρνουμε το clerkId από τη session
    const authData = await auth();
    const clerkId = authData.userId;

    if (!clerkId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2) Βρίσκουμε τον χρήστη στη βάση
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3) Παίρνουμε το electionId από τα query params
    const url = new URL(request.url);
    const electionIdParam = url.searchParams.get("electionId");
    if (!electionIdParam) {
      return NextResponse.json(
        { error: "Missing electionId" },
        { status: 400 }
      );
    }
    const electionId = parseInt(electionIdParam, 10);
    if (isNaN(electionId)) {
      return NextResponse.json(
        { error: "Invalid electionId" },
        { status: 400 }
      );
    }

    // 4) Ελέγχουμε αν έχει ψηφίσει
    const vote = await prisma.vote.findUnique({
      where: {
        userId_electionId: {
          userId: user.id,
          electionId: electionId,
        },
      },
    });

    return NextResponse.json({ hasVoted: !!vote });
  } catch (error) {
    console.error("GET /api/vote/status error:", error);
    return NextResponse.json(
      { error: "Failed to fetch voting status." },
      { status: 500 }
    );
  }
}
