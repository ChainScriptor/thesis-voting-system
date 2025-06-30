import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerkId: true,
        fullName: true,
        email: true,
      },
    });

    // Get all candidates
    const candidates = await prisma.candidate.findMany({
      select: {
        id: true,
        name: true,
        clerkId: true,
        is_person: true,
      },
    });

    // Get all elections
    const elections = await prisma.election.findMany({
      select: {
        id: true,
        title: true,
        is_active: true,
      },
    });

    // Get all takepart records
    const takepart = await prisma.takepart.findMany({
      select: {
        electionId: true,
        candidateId: true,
        numberOfVotes: true,
      },
    });

    // Get all votes
    const votes = await prisma.vote.findMany({
      select: {
        id: true,
        userId: true,
        electionId: true,
        candidateId: true,
      },
    });

    return NextResponse.json({
      users,
      candidates,
      elections,
      takepart,
      votes,
    });
  } catch (error) {
    console.error("GET /api/test-db error:", error);
    return NextResponse.json(
      { error: "Failed to fetch database data" },
      { status: 500 }
    );
  }
} 