// app/api/elections/[id]/candidates/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const electionId = parseInt(id, 10);
  if (isNaN(electionId)) {
    return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
  }
  const tps = await prisma.takepart.findMany({
    where: { electionId },
    include: { user: true },
  });
  return NextResponse.json(
    tps.map((tp) => ({
      id: tp.candidateId, // candidateId είναι πλέον userId
      name: tp.user?.fullName ?? null,
      email: tp.user?.email ?? null,
      occupation: tp.user?.occupation ?? null,
      numberOfVotes: tp.numberOfVotes,
    }))
  );
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

  // Δημιουργούμε την πρόσκληση
  await prisma.poll_candidates.create({
    data: { poll_id: electionId, user_id: userId },
  });

  // Upsert στο takepart
  await prisma.takepart.upsert({
    where: {
      electionId_candidateId: {
        electionId,
        candidateId: userId, // candidateId είναι userId
      },
    },
    update: {},
    create: {
      electionId,
      candidateId: userId, // candidateId είναι userId
      numberOfVotes: 0,
    },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; candidateId: string }> }
) {
  const { id, candidateId } = await params;
  const electionId = parseInt(id, 10);
  const candId = parseInt(candidateId, 10);
  if (isNaN(electionId) || isNaN(candId)) {
    return NextResponse.json({ error: "Invalid ids" }, { status: 400 });
  }

  // Διαγράφουμε το takepart
  await prisma.takepart.deleteMany({
    where: { electionId, candidateId: candId },
  });
  // Διαγράφουμε την πρόσκληση
  await prisma.poll_candidates.deleteMany({
    where: { poll_id: electionId, user_id: candId },
  });

  return NextResponse.json({ success: true });
}
