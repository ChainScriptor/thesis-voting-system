// app/api/elections/[id]/route.ts

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const electionId = parseInt(params.id, 10);
  if (isNaN(electionId)) {
    return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
  }

  try {
    const election = await prisma.election.findUnique({
      where: { id: electionId },
      include: {
        takepart: {
          include: { candidate: true },
        },
      },
    });

    if (!election) {
      return NextResponse.json({ error: "Election not found" }, { status: 404 });
    }

    const formatted = {
      id: election.id,
      title: election.title,
      description: election.description,
      dateRange: {
        startDate: election.start_date.toISOString(),
        endDate: election.end_date.toISOString(),
      },
      targeting: {
        roles: election.target_occupation ? [election.target_occupation] : [],
        locations: election.target_location ? [election.target_location] : [],
      },
      candidates: election.takepart.map((tp) => tp.candidate),
      createdAt: election.start_date.toISOString(),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/elections/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch election" }, { status: 500 });
  }
}
