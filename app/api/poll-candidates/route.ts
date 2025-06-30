// app/api/poll-candidates/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/poll-candidates?pollId=…
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const pollId = url.searchParams.get("pollId");

  if (!pollId) {
    return NextResponse.json({ error: "Missing pollId" }, { status: 400 });
  }

  const poll_id_num = parseInt(pollId, 10);
  if (isNaN(poll_id_num)) {
    return NextResponse.json({ error: "Invalid pollId" }, { status: 400 });
  }

  try {
    const candidates = await prisma.poll_candidates.findMany({
      where: {
        poll_id: poll_id_num,
      },
      select: {
        id: true,
        poll_id: true,
        user_id: true,
        invited_at: true,
        user: {
          select: {
            fullName: true,
            email: true,
            occupation: true,
          },
        },
      },
    });

    // Flatten the result to match the original structure
    const flattenedCandidates = candidates.map((c) => ({
      id: c.id,
      poll_id: c.poll_id,
      user_id: c.user_id,
      invited_at: c.invited_at,
      fullName: c.user.fullName,
      email: c.user.email,
      occupation: c.user.occupation,
    }));

    return NextResponse.json(flattenedCandidates);
  } catch (err) {
    console.error("GET /api/poll-candidates error:", err);
    return NextResponse.json(
      { error: "Database error occurred." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/poll-candidates
 * body: { pollId: string, userId: number }
 */
export async function POST(request: Request) {
  try {
    const { pollId, userId } = await request.json();

    if (!pollId || typeof userId !== "number") {
      return NextResponse.json(
        { error: "Missing pollId or invalid userId" },
        { status: 400 }
      );
    }

    const poll_id_num = Number(pollId);
    if (isNaN(poll_id_num)) {
      return NextResponse.json({ error: "Invalid pollId" }, { status: 400 });
    }

    const newCandidate = await prisma.poll_candidates.create({
      data: {
        poll_id: poll_id_num,
        user_id: userId,
      },
      select: {
        id: true,
        poll_id: true,
        user_id: true,
        invited_at: true,
        user: {
          select: {
            fullName: true,
            email: true,
            occupation: true,
          },
        },
      },
    });
    
    // Flatten the result
     const flattenedCandidate = {
      id: newCandidate.id,
      poll_id: newCandidate.poll_id,
      user_id: newCandidate.user_id,
      invited_at: newCandidate.invited_at,
      fullName: newCandidate.user.fullName,
      email: newCandidate.user.email,
      occupation: newCandidate.user.occupation,
    };


    return NextResponse.json(flattenedCandidate, { status: 201 });
  } catch (err) {
    console.error("POST /api/poll-candidates error:", err);
    return NextResponse.json(
      { error: "Database error occurred." },
      { status: 500 }
    );
  }
}