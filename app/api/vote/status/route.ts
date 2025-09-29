// app/api/vote/status/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // 1) Παίρνουμε το clerkId από τη session
    const authData = await auth();
    const clerkId = authData.userId;

    if (!clerkId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2) Βρίσκουμε τον χρήστη στη βάση
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3) Παίρνουμε τα electionIds από τα query params
    const url = new URL(request.url);
    const electionIdsParam = url.searchParams.get("electionIds") || url.searchParams.get("electionId");

    if (!electionIdsParam) {
      return NextResponse.json(
        { error: "Missing electionIds" },
        { status: 400 }
      );
    }

    // Parse electionIds - support both single and multiple IDs
    const electionIds: number[] = electionIdsParam.split(',').map(id => {
      const parsed = parseInt(id.trim(), 10);
      if (isNaN(parsed)) {
        throw new Error(`Invalid electionId: ${id}`);
      }
      return parsed;
    });

    // 4) Ελέγχουμε αν έχει ψηφίσει για όλα τα elections με ένα query
    const votes = await prisma.vote.findMany({
      where: {
        userId: user.id,
        electionId: { in: electionIds },
      },
      select: {
        electionId: true
      }
    });

    // Create result object
    const votedElectionIds = new Set(votes.map(v => v.electionId));
    const result = electionIds.length === 1
      ? { hasVoted: votedElectionIds.has(electionIds[0]) }
      : Object.fromEntries(
        electionIds.map(id => [id, votedElectionIds.has(id)])
      );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Vote status error:', error);

    // Αν είναι database connection error, επιστρέφουμε false για όλα
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P1001') {
      console.log('Database connection error detected, returning false');

      const url = new URL(request.url);
      const electionIdsParam = url.searchParams.get("electionIds") || url.searchParams.get("electionId");
      const electionIds = electionIdsParam ? electionIdsParam.split(',').map(() => false) : [false];

      return NextResponse.json(
        electionIds.length === 1
          ? { hasVoted: false }
          : Object.fromEntries(electionIds.map((_, i) => [i + 1, false]))
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch voting status.", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
