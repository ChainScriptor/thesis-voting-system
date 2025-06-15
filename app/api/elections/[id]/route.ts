// app/api/elections/[id]/route.ts

export const dynamic = "force-dynamic"; // 👈 Σημαντικό

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    const electionId = parseInt(id, 10);

    if (isNaN(electionId)) {
      return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
    }

    const election = await prisma.election.findUnique({
      where: { id: electionId },
      include: {
        takeparts: {
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
      candidates: election.takeparts.map((tp) => tp.candidate),
      createdAt: election.start_date.toISOString(),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/elections/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch election" }, { status: 500 });
  }
}
