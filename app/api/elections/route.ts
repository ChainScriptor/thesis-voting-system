// app/api/elections/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { broadcastNewPoll } from "../polls-events/route";

export const dynamic = "force-dynamic";

/**
 * GET /api/elections
 */
export async function GET() {
  try {
    const elections = await prisma.election.findMany({
      include: {
        poll_candidates: { include: { user: true } },
        takepart: true,
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
      candidates: el.poll_candidates.map((pc) => ({
        id: pc.id,
        name: pc.user?.fullName || pc.text_option || 'Unknown',
        fullName: pc.user?.fullName || pc.text_option || 'Unknown',
        email: pc.user?.email || null,
        occupation: pc.user?.occupation || null,
        type: pc.candidate_type,
        votes: el.takepart.find(tp => tp.candidateId === pc.id)?.numberOfVotes || 0,
      })),
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
      voting_type = "public",
      access_code = null,
      startDate,
      endDate,
      target_occupation = null,
      target_location = null,
      target_gender = null,
      birthdate_min = null,
      birthdate_max = null,
      candidate_type = "users",
      candidateIds = [],
      textOptions = [],
      invitedUserIds = [],
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
        voting_type,
        access_code,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        target_occupation,
        target_location,
        target_gender,
        birthdate_min: birthdate_min ? new Date(birthdate_min) : null,
        birthdate_max: birthdate_max ? new Date(birthdate_max) : null,
        is_active: true,
        userId: dbUser.id,
      },
    });

    // Προσθήκη υποψηφίων αν υπάρχουν (προσωρινά απλοποιημένο)
    if (candidate_type === "users" && candidateIds && candidateIds.length > 0) {
      await prisma.poll_candidates.createMany({
        data: candidateIds.map((userId: number) => ({
          poll_id: newEl.id,
          user_id: userId,
        })),
      });
    } else if (candidate_type === "text" && textOptions && textOptions.length > 0) {
      await prisma.poll_candidates.createMany({
        data: textOptions.map((textOption: string) => ({
          poll_id: newEl.id,
          user_id: null,
          text_option: textOption,
          candidate_type: "text",
        })),
      });
    }

    // Προσθήκη προσκεκλημένων χρηστών αν υπάρχουν
    if (voting_type === "invitation_only" && invitedUserIds && invitedUserIds.length > 0) {
      await prisma.election_invitations.createMany({
        data: invitedUserIds.map((userId: number) => ({
          electionId: newEl.id,
          userId: userId,
        })),
      });
    }

    // Φόρτωση των υποψηφίων για το response
    const electionWithCandidates = await prisma.election.findUnique({
      where: { id: newEl.id },
      include: {
        poll_candidates: { include: { user: true } },
      },
    });

    const pollData = {
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
      candidates: electionWithCandidates?.poll_candidates.map(pc =>
        pc.user
          ? pc.user
          : { id: pc.id, fullName: `Επιλογή ${pc.id}`, email: null, occupation: null }
      ) || [],
      createdAt: newEl.start_date.toISOString(),
      isActive: newEl.is_active,
    };

    // Broadcast the new poll to all connected clients
    console.log('Broadcasting new poll:', pollData);
    broadcastNewPoll(pollData);

    return NextResponse.json(pollData, { status: 201 });
  } catch (error) {
    console.error("POST /api/elections error:", error);
    return NextResponse.json(
      { error: "Failed to create election." },
      { status: 500 }
    );
  }
}
