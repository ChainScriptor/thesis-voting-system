import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { electionId, candidateId } = await request.json();

    if (!electionId || !candidateId) {
      return NextResponse.json(
        { error: "Missing electionId or candidateId" },
        { status: 400 }
      );
    }

    // Create takepart record
    const takepart = await prisma.takepart.create({
      data: {
        electionId: Number(electionId),
        candidateId: Number(candidateId),
        numberOfVotes: 0,
      }
    });

    return NextResponse.json({
      success: true,
      takepart
    });
  } catch (error) {
    console.error("POST /api/add-candidate-to-election error:", error);
    return NextResponse.json(
      { error: "Failed to add candidate to election" },
      { status: 500 }
    );
  }
} 