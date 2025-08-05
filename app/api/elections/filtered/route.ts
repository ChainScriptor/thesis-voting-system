// app/api/elections/filtered/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // ✅ Πρώτα περιμένουμε το auth και μετά παίρνουμε userId
    const authData = await auth();
    const userId = authData.userId;

    if (!userId) {
      return NextResponse.json([], { status: 401 });
    }

    // φέρε user
    const dbUser = await prisma.user.findUnique({ 
      where: { clerkId: userId },
      select: { id: true, gender: true, occupation: true, location: true, birthdate: true }
    });

    if (!dbUser) {
      return NextResponse.json([], { status: 200 });
    }

    const elections = await prisma.election.findMany({
      where: {
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
      include: { takepart: { include: { user: true } } },
      orderBy: { start_date: "desc" },
    });

    const formatted = elections.map((el) => ({
      id: el.id,
      title: el.title,
      description: el.description,
      dateRange: {
        startDate: el.start_date ? el.start_date.toISOString() : null,
        endDate: el.end_date ? el.end_date.toISOString() : null,
      },
      targeting: {
        roles: el.target_occupation ? [el.target_occupation] : [],
        locations: el.target_location ? [el.target_location] : [],
      },
      candidates: el.takepart.map((tp) => tp.user),
      createdAt: el.start_date ? el.start_date.toISOString() : null,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Election Filtered Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
