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
        poll_candidates: { include: { user: true } },
        takepart: true, // Προσθέτουμε τα αποτελέσματα ψηφοφορίας
      },
      orderBy: { start_date: "desc" },
    });

    const formatted = elections.map((el) => ({
      id: el.id,
      title: el.title,
      description: el.description,
      voting_type: el.voting_type,
      access_code: el.access_code,
      dateRange: {
        startDate: el.start_date ? el.start_date.toISOString() : null,
        endDate: el.end_date ? el.end_date.toISOString() : null,
      },
      targeting: {
        roles: el.target_occupation ? [el.target_occupation] : [],
        locations: el.target_location ? [el.target_location] : [],
        gender: el.target_gender,
        birthdate_min: el.birthdate_min ? el.birthdate_min.toISOString() : null,
        birthdate_max: el.birthdate_max ? el.birthdate_max.toISOString() : null,
      },
      candidates: el.poll_candidates.map((pc) => {
        const takepartEntry = el.takepart.find(tp => tp.candidateId === pc.id);
        return {
          id: pc.id,
          name: pc.user?.fullName || pc.text_option || 'Unknown',
          type: pc.candidate_type,
          votes: takepartEntry?.numberOfVotes || 0,
        };
      }),
      totalVotes: el.takepart.reduce((sum, tp) => sum + tp.numberOfVotes, 0),
      createdAt: el.start_date ? el.start_date.toISOString() : null,
      isActive: el.is_active,
      createdByCurrentUser: true,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/elections/my error:", error);
    return NextResponse.json({ error: "Failed to fetch my elections" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const clerkId = session.userId;
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const electionId = searchParams.get('electionId');

    if (!electionId) {
      return NextResponse.json({ error: "Missing electionId" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ελέγχουμε αν η ψηφοφορία ανήκει στον χρήστη
    const election = await prisma.election.findFirst({
      where: {
        id: parseInt(electionId),
        userId: dbUser.id
      },
    });

    if (!election) {
      return NextResponse.json({ error: "Election not found or not authorized" }, { status: 404 });
    }

    // Διαγράφουμε πρώτα τα σχετικά δεδομένα με τη σειρά
    const electionIdInt = parseInt(electionId);

    // 1. Διαγράφουμε τις ψήφους
    await prisma.vote.deleteMany({
      where: { electionId: electionIdInt },
    });

    // 2. Διαγράφουμε τα αποτελέσματα ψηφοφορίας
    await prisma.takepart.deleteMany({
      where: { electionId: electionIdInt },
    });

    // 3. Διαγράφουμε τους υποψηφίους
    await prisma.poll_candidates.deleteMany({
      where: { poll_id: electionIdInt },
    });

    // 4. Τέλος διαγράφουμε την ψηφοφορία
    await prisma.election.delete({
      where: { id: electionIdInt },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/elections/my error:", error);
    return NextResponse.json({ error: "Failed to delete election" }, { status: 500 });
  }
}
