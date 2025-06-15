// app/api/elections/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const elections = await prisma.election.findMany({
      include: { takeparts: { include: { candidate: true } } },
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
      candidates: el.takeparts.map((tp) => tp.candidate),
      createdAt: el.start_date.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/elections error:", error);
    return NextResponse.json({ error: "Failed to fetch elections." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ο ένας, seeded admin
    const adminUser = await prisma.user.findFirst({ where: { isAdmin: true } });
    if (!adminUser) {
      return NextResponse.json(
        { error: "No admin user found. Please seed an admin." },
        { status: 500 }
      );
    }

    const election = await prisma.election.create({
      data: {
        title: body.title,
        description: body.description,
        start_date: new Date(body.start_date),
        end_date: new Date(body.end_date),
        is_active: body.is_active,
        userId: adminUser.id,           // πάντα ο ίδιος admin
        target_occupation: body.target_occupation ?? null,
        target_location: body.target_location ?? null,
        birthdate_min: body.birthdate_min ? new Date(body.birthdate_min) : null,
        birthdate_max: body.birthdate_max ? new Date(body.birthdate_max) : null,
        target_gender: body.target_gender ?? null,
      },
    });

    return NextResponse.json(election, { status: 201 });
  } catch (error) {
    console.error("POST /api/elections error:", error);
    return NextResponse.json({ error: "Failed to create election." }, { status: 500 });
  }
}
