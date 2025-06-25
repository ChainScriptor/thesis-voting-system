// app/api/elections/filtered/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  // 1) Έλεγχος authentication
  const session = await auth();
  const clerkId = session.userId;
  if (!clerkId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2) Φόρτωση profile από DB
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      birthdate: true,
      occupation: true,
      location: true,
      gender: true,
    },
  });

  // 3) Αν δεν υπάρχει user record, δεν βλέπει καμία ψηφοφορία
  if (!user) {
    return NextResponse.json([], { status: 200 });
  }

  // 4) Φόρτωση των εκλογών με βάση τα φίλτρα του προφίλ
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
        ...(user.birthdate
          ? [
              {
                OR: [
                  {
                    AND: [
                      { birthdate_min: { lte: user.birthdate } },
                      { birthdate_max: { gte: user.birthdate } },
                    ],
                  },
                  {
                    AND: [
                      { birthdate_min: null },
                      { birthdate_max: null },
                    ],
                  },
                ],
              },
            ]
          : []),
      ],
    },
    include: {
      takepart: { include: { candidate: true } },
    },
    orderBy: { start_date: "desc" },
  });

  // 5) Μετατροπή σε API σχήμα
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
