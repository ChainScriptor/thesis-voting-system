// app/api/elections/my/route.ts

//api για να καλώ στο front end στο poll μόνο τις ψηφοφορίες που έχει δημιουργήσει αυτός ο χρήστης
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const elections = await prisma.election.findMany({
      where: { userId: dbUser.id },
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
  createdByCurrentUser: true, 
}));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/elections/my error:", error);
    return NextResponse.json({ error: "Failed to fetch my elections" }, { status: 500 });
  }
}
