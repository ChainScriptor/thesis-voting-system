import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const electionId = parseInt(id, 10);
  if (isNaN(electionId)) {
    return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
  }

  try {
    const tps = await prisma.takepart.findMany({
      where: { electionId },
      include: {
        candidate: {
          include: {
            user: { select: { email: true, occupation: true } }
          }
        }
      }
    });

    const result = tps.map((tp) => ({
      id: tp.candidateId,
      poll_id: tp.electionId,
      candidateId: tp.candidate.id,
      numberOfVotes: tp.numberOfVotes,
      name: tp.candidate.name,
      description: tp.candidate.description,
      image: tp.candidate.image,
      is_person: tp.candidate.is_person,
      clerkId: tp.candidate.clerkId,
      email: tp.candidate.user?.email ?? null,
      occupation: tp.candidate.user?.occupation ?? null,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/elections/:id/candidates error:", err);
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const electionId = parseInt(id, 10);
  if (isNaN(electionId)) {
    return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
  }

  const { userId } = await request.json();
  if (typeof userId !== "number") {
    return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });
  }

  try {
    // 1) δημιουργούμε poll_candidate
    const pc = await prisma.poll_candidates.create({
      data: { poll_id: electionId, user_id: userId },
      include: {
        user: { select: { fullName: true, email: true, occupation: true } }
      }
    });

    // 2) δημιουργούμε/αρχικοποιούμε takepart με numberOfVotes=0
    await prisma.takepart.create({
      data: {
        electionId,
        candidateId: userId,
        numberOfVotes: 0,
      }
    }).catch((e) => {
      if (!/Unique constraint/.test(String(e))) console.error(e);
    });

    // 3) επιστρέφουμε στον client
    return NextResponse.json({
      id: pc.id,
      poll_id: pc.poll_id,
      user_id: pc.user_id,
      invited_at: pc.invited_at,
      fullName: pc.user.fullName,
      email: pc.user.email,
      occupation: pc.user.occupation,
      numberOfVotes: 0,
    });
  } catch (err) {
    console.error("POST /api/elections/:id/candidates error:", err);
    return NextResponse.json({ error: "Failed to add candidate" }, { status: 500 });
  }
}
