// app/api/elections/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const elections = await prisma.election.findMany({
      include: {
        // ΠΑΛΙΑ: takeparts
        takepart: {
          include: { candidate: true },
        },
      },
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
      // ΠΑΛΙΑ: el.takeparts
      candidates: el.takepart.map((tp) => tp.candidate),
      createdAt: el.start_date.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/elections error:", error);
    return NextResponse.json(
      { error: "Failed to fetch elections." },
      { status: 500 }
    );
  }
}
