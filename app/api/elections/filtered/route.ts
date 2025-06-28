// app/api/elections/filtered/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const session = await auth();
  if (!session.userId) return NextResponse.json([], { status: 401 });

  // φέρε user
  const dbUser = await prisma.user.findUnique({ 
    where: { clerkId: session.userId },
    select: { id: true, gender: true, occupation: true, location: true, birthdate: true }
  });
  if (!dbUser) return NextResponse.json([], { status: 200 });

  // φέρε ποιες έχει ήδη ψηφίσει
  const voted = await prisma.vote.findMany({
    where: { userId: dbUser.id },
    select: { electionId: true },
  });
  const votedIds = voted.map((v) => v.electionId);

  // **ΑΦΑΙΡΕΙ ΤΟ φίλτρο end_date > τώρα**
  const elections = await prisma.election.findMany({
    where: {
      id: { notIn: votedIds },
      AND: [
        { OR: [{ target_gender: dbUser.gender }, { target_gender: null }, { target_gender: "all" }] },
        { OR: [{ target_occupation: dbUser.occupation }, { target_occupation: null }, { target_occupation: "all" }] },
        { OR: [{ target_location: dbUser.location }, { target_location: null }, { target_location: "all" }] },
        ...(dbUser.birthdate
          ? [
              { birthdate_min: { lte: dbUser.birthdate } },
              { birthdate_max: { gte: dbUser.birthdate } },
            ]
          : []),
      ],
    },
    include: { takepart: { include: { candidate: true } } },
    orderBy: { start_date: "desc" },
  });

  const formatted = elections.map((el) => ({
    id: el.id,
    title: el.title,
    description: el.description,
    dateRange: {
      startDate: el.start_date.toISOString(),
      endDate: el.end_date.toISOString(),
    },
    targeting: {
      roles: el.target_occupation ? [el.target_occupation] : [],
      locations: el.target_location ? [el.target_location] : [],
    },
    candidates: el.takepart.map((tp) => tp.candidate),
    createdAt: el.start_date.toISOString(),
  }));

  return NextResponse.json(formatted);
}
