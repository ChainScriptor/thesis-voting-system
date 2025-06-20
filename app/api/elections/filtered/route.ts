// app/api/elections/filtered/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // 1) Έλεγχος authentication
    const session = await auth();
    const clerkId = session.userId;
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2) Φόρτωση προφίλ από DB
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        birthdate: true,
        occupation: true,
        location: true,
        gender: true,
      },
    });

    // 3) Αν δεν υπάρχει user record, επιστρέφουμε κενό array
    if (!user) {
      return NextResponse.json([], { status: 200 });
    }

    // 4) Εφαρμογή των φίλτρων *ΧΩΡΙΣ* κανέναν έλεγχο για start/end date
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
          // **Αφαιρούμε** εντελώς τυχόν birthdate_min/birthdate_max check
        ],
      },
      include: { takepart: { include: { candidate: true } } },
      orderBy: { start_date: "desc" },
    });

    // 5) Μετατροπή σε array με το σωστό σχήμα
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
  } catch (error) {
    console.error("🔥 GET /api/elections/filtered error:", error);
    return NextResponse.json(
      { error: "Failed to fetch filtered elections." },
      { status: 500 }
    );
  }
}
