// app/api/vote/submit/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface VoteBody {
  electionId: number;
  candidateId: number;
}

export async function POST(request: Request) {
  try {
    // 1. Authentication
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2. Parse and validate body
    const body: VoteBody = await request.json();
    const { electionId, candidateId } = body;
    if (typeof electionId !== "number" || typeof candidateId !== "number") {
      return NextResponse.json(
        { error: "Invalid payload: electionId and candidateId must be numbers." },
        { status: 400 }
      );
    }

    // 3. Find internal user id
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const realUserId = user.id;

    // 4. Check if user has already voted in this election
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_electionId: {
          userId: realUserId,
          electionId,
        },
      },
    });
    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted in this election." },
        { status: 409 }
      );
    }

    // 5. Create the vote
    const newVote = await prisma.vote.create({
      data: {
        userId: realUserId,
        electionId,
        candidateId,
      },
    });

    return NextResponse.json({ success: true, voteId: newVote.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/vote/submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit vote." },
      { status: 500 }
    );
  }
}