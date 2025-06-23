// app/api/elections/[id]/candidates/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET  /api/elections/:id/candidates
 * Επιστρέφει όλους τους υποψήφιους (takeparts) για μια εκλογή
 */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const electionId = parseInt(params.id, 10);
  if (isNaN(electionId)) {
    return NextResponse.json(
      { error: "Invalid election id" },
      { status: 400 }
    );
  }

  try {
    const tps = await prisma.takepart.findMany({
      where: { electionId },
      include: { candidate: true },
    });

    // Διαμορφώνουμε το JSON που θέλει το frontend
    const result = tps.map((tp) => ({
      id: tp.candidateId,           // χρησιμοποιεί το candidateId ως μοναδικό
      poll_id: tp.electionId,
      candidateId: tp.candidate.id,  // το πραγματικό id του candidate
      numberOfVotes: tp.numberOfVotes,
      name: tp.candidate.name,
      description: tp.candidate.description,
      image: tp.candidate.image,
      is_person: tp.candidate.is_person,
      clerkId: tp.candidate.clerkId,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET candidates error:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/elections/:id/candidates
 * Σώζει έναν νέο takepart (υποψήφιο) και επιστρέφει το αντικείμενο του
 * body: { userId: number }
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const electionId = parseInt(params.id, 10);
  if (isNaN(electionId)) {
    return NextResponse.json(
      { error: "Invalid election id" },
      { status: 400 }
    );
  }

  const { userId } = await req.json();
  if (typeof userId !== "number") {
    return NextResponse.json(
      { error: "Missing or invalid userId" },
      { status: 400 }
    );
  }

  try {
    const tp = await prisma.takepart.create({
      data: {
        electionId,
        candidateId: userId,
        numberOfVotes: 0,
      },
      include: { candidate: true },
    });

    return NextResponse.json({
      id: tp.candidateId,
      poll_id: tp.electionId,
      candidateId: tp.candidate.id,
      numberOfVotes: tp.numberOfVotes,
      name: tp.candidate.name,
      description: tp.candidate.description,
      image: tp.candidate.image,
      is_person: tp.candidate.is_person,
      clerkId: tp.candidate.clerkId,
    });
  } catch (error) {
    console.error("POST candidates error:", error);
    return NextResponse.json(
      { error: "Failed to add candidate" },
      { status: 500 }
    );
  }
}
