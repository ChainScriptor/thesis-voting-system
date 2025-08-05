// app/api/poll-candidates/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/poll-candidates?pollId=…
 * Επιστρέφει τώρα σωστά το candidateId = PK του candidate table
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
    // 1) Φέρε όλες τις poll_candidates
    const pcs = await prisma.poll_candidates.findMany({
      where: { poll_id: poll_id_num },
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
            clerkId: true,
          },
        },
      },
    });

    // 2) Βρες τα matching candidate.id μέσω του clerkId
    const allClerkIds = pcs.map((p) => p.user.clerkId);
    const candRecords = await prisma.candidate.findMany({
      where: { clerkId: { in: allClerkIds } },
      select: { id: true, clerkId: true },
    });

    // 3) Σύνθεσε την τελική λίστα με το correct candidateId
    const flattened = pcs.map((pc) => {
      const match = candRecords.find((c) => c.clerkId === pc.user.clerkId);
      return {
        id: pc.id,                   // poll_candidates.id
        poll_id: pc.poll_id,
        user_id: pc.user_id,
        invited_at: pc.invited_at,
        fullName: pc.user.fullName,
        email: pc.user.email,
        occupation: pc.user.occupation,
        candidateId: match ? match.id : null, // <-- εδώ είναι το σωστό PK
      };
    });

    return NextResponse.json(flattened);
  } catch (err) {
    console.error("GET /api/poll-candidates error:", err);
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
}

/**
 * POST /api/poll-candidates
 * body: { pollId: string, userId: number }
 * (upsert στο takepart ήδη το έχεις)
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

    // 1. Δημιουργία poll_candidates
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
            clerkId: true,
          },
        },
      },
    });

    // 2. Βρες candidateId από το clerkId του user
    const candidate = await prisma.candidate.findUnique({
      where: {
        clerkId: newCandidate.user.clerkId,
      },
      select: {
        id: true,
      },
    });

    // 3. Upsert στο takepart (αν δεν υπάρχει, δημιουργεί)
    if (candidate) {
      await prisma.takepart.upsert({
        where: {
          electionId_candidateId: {
            electionId: poll_id_num,
            candidateId: candidate.id,
          },
        },
        update: {},
        create: {
          electionId: poll_id_num,
          candidateId: candidate.id,
          numberOfVotes: 0,
        },
      });
    }

    const flattenedCandidate = {
      id: newCandidate.id,
      poll_id: newCandidate.poll_id,
      user_id: newCandidate.user_id,
      invited_at: newCandidate.invited_at,
      fullName: newCandidate.user.fullName,
      email: newCandidate.user.email,
      occupation: newCandidate.user.occupation,
      candidateId: candidate?.id ?? null,
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

/**
 * DELETE /api/poll-candidates
 * body: { pollId: string, userId: number }
 * (διαγράφει το takepart)
 */
/* … το POST / DELETE σου μένουν ακριβώς όπως είναι … */
