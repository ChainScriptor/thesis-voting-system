// app/api/elections/filtered/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // 1) βγάλε το session για να δεις τι παίρνεις από Clerk
    const session = await auth();

    const clerkId = session.userId;
    if (!clerkId) {
      console.warn("⚠️ No clerkId in session");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2) fetch user από τη βάση
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { birthdate: true, occupation: true, location: true, gender: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User record not found" }, { status: 404 });
    }

    // 3) το query
    const elections = await prisma.election.findMany({
      where: {
        AND: [
          {
            OR: [
              { target_gender: user.gender },
              { target_gender: null },
              { target_gender: "all" },
            ],
          },
          {
            OR: [
              { target_occupation: user.occupation },
              { target_occupation: null },
              { target_occupation: "all" },
            ],
          },
          {
            OR: [
              { target_location: user.location },
              { target_location: null },
              { target_location: "all" },
            ],
          },
          // οι δύο birthdate comparisons – μόνο αν υπάρχει birthdate
          ...(user.birthdate
            ? [
                { birthdate_min: { lte: user.birthdate } },
                { birthdate_max: { gte: user.birthdate } },
              ]
            : []),
        ],
      },
      include: { takeparts: { include: { candidate: true } } },
      orderBy: { start_date: "desc" },
    });


    // 4) formatting
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
    console.error("🔥 GET /api/elections/filtered error:", error);
    return NextResponse.json(
      { error: "Failed to fetch filtered elections." },
      { status: 500 }
    );
  }
}
