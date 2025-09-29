import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function extractIdFromUrl(request: Request): number | null {
  const { pathname } = new URL(request.url);
  // ["", "api", "elections", "<id>"]
  const parts = pathname.split("/");
  const id = parseInt(parts[3], 10);
  return isNaN(id) ? null : id;
}

/**
 * GET  /api/elections/:id
 */
export async function GET(request: Request) {
  const electionId = extractIdFromUrl(request);
  if (electionId === null) {
    return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
  }

  try {
    const election = await prisma.election.findUnique({
      where: { id: electionId },
      include: {
        poll_candidates: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!election) {
      return NextResponse.json({ error: "Election not found" }, { status: 404 });
    }

    const formatted = {
      id: election.id,
      title: election.title,
      description: election.description,
      voting_type: election.voting_type,
      access_code: election.access_code,
      dateRange: {
        startDate: election.start_date.toISOString(),
        endDate: election.end_date.toISOString(),
      },
      targeting: {
        roles: election.target_occupation ? [election.target_occupation] : [],
        locations: election.target_location ? [election.target_location] : [],
      },
      candidates: election.poll_candidates.map((pc) => ({
        id: pc.id, // Πάντα το poll_candidates.id
        name: pc.user ? pc.user.fullName : pc.text_option || `Επιλογή ${pc.id}`,
        fullName: pc.user ? pc.user.fullName : pc.text_option || `Επιλογή ${pc.id}`,
        email: pc.user ? pc.user.email : null,
        occupation: pc.user ? pc.user.occupation : null,
        numberOfVotes: 0, // Θα το υπολογίσουμε αργότερα
      })),
      createdAt: election.start_date.toISOString(),
      isActive: election.is_active,
    };

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/elections/:id
 */
export async function DELETE(request: Request) {
  const electionId = extractIdFromUrl(request);
  if (electionId === null) {
    return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
  }

  try {
    const { userId: clerkId } = await auth();
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

    const election = await prisma.election.findUnique({
      where: { id: electionId },
      select: { userId: true },
    });
    if (!election) {
      return NextResponse.json({ error: "Election not found" }, { status: 404 });
    }
    if (election.userId !== dbUser.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.election.delete({ where: { id: electionId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/elections/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete election" }, { status: 500 });
  }
}
