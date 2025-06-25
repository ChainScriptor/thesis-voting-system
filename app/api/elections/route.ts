// app/api/elections/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/elections
 */
export async function GET() {
  try {
    const elections = await prisma.election.findMany({
      include: {
        takepart: { include: { candidate: true } },
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
      candidates: el.takepart.map((tp) => tp.candidate),
      createdAt: el.start_date.toISOString(),
      isActive: el.is_active,
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

/**
 * POST /api/elections
 */
export async function POST(request: Request) {
  try {
    const session = await auth();
    const clerkId = session.userId;
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
    if (!dbUser) {
      return NextResponse.json({ error: "User not registered" }, { status: 404 });
    }

    const {
      title,
      description,
      startDate,
      endDate,
      targetOccupation = null,
      targetLocation = null,
      targetGender = null,
      birthdateMin = null,
      birthdateMax = null,
    } = await request.json();

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newEl = await prisma.election.create({
      data: {
        title,
        description,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        target_occupation: targetOccupation,
        target_location: targetLocation,
        target_gender: targetGender,
        birthdate_min: birthdateMin ? new Date(birthdateMin) : null,
        birthdate_max: birthdateMax ? new Date(birthdateMax) : null,
        is_active: true,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(
      {
        id: newEl.id,
        title: newEl.title,
        description: newEl.description,
        dateRange: {
          startDate: newEl.start_date.toISOString(),
          endDate: newEl.end_date.toISOString(),
        },
        targeting: {
          roles: newEl.target_occupation ? [newEl.target_occupation] : [],
          locations: newEl.target_location ? [newEl.target_location] : [],
        },
        candidates: [],
        createdAt: newEl.start_date.toISOString(),
        isActive: newEl.is_active,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/elections error:", error);
    return NextResponse.json(
      { error: "Failed to create election." },
      { status: 500 }
    );
  }
}
