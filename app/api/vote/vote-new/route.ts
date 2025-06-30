// app/api/vote/vote-new/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface VoteBody {
  electionId: number;
  candidateId: number; // This is the user_id of the candidate
}

export async function POST(request: Request) {
  try {
    // 1) Get authenticated user's clerkId
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2) Validate payload
    const body: VoteBody = await request.json();
    const { electionId, candidateId } = body;
    if (typeof electionId !== "number" || typeof candidateId !== "number") {
      return NextResponse.json(
        { error: "Invalid payload: electionId and candidateId must be numbers." },
        { status: 400 }
      );
    }
    
    // 3) Find the internal user ID from clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Authenticated user not found in the database." }, { status: 404 });
    }
    const realUserId = user.id;

    // 4) Create the vote record.
    // Prisma's unique constraint on (userId, electionId) will automatically
    // prevent duplicate votes and throw an error.
    const newVote = await prisma.vote.create({
      data: {
        userId: realUserId,
        electionId: electionId,
        candidateId: candidateId, // The candidate is also a user
      },
    });

    return NextResponse.json({ success: true, voteId: newVote.id }, { status: 201 });

  } catch (error) {
    // Check if the error is due to a unique constraint violation (duplicate vote)
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
       return NextResponse.json(
        { error: "You have already voted in this election." },
        { status: 409 } // 409 Conflict
      );
    }

    console.error("POST /api/vote-new error:", error);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
