// app/api/vote/status/route.ts - ΕΠΙΓΟΠΟΤΕΣΗ ΑΠΛΟΠΟΙΗΣΗ

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const electionId = parseInt(url.searchParams.get("electionId") || "0");

    if (!electionId) {
      return NextResponse.json({ error: "Election ID required" }, { status: 400 });
    }

    // Απλή έλεγχος authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ hasVoted: false });
    }

    // Περισσότερο απλό query για τον χρήστη
    const user = await prisma.user.findFirst({
      where: { clerkId: userId },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ hasVoted: false });
    }

    // Εύκολο έλεγχος για ψήφο
    const vote = await prisma.vote.findFirst({
      where: {
        userId: user.id,
        electionId: electionId,
      },
    });

    return NextResponse.json({ hasVoted: !!vote });
  } catch (error) {
    console.error('Vote status error:', error);
    // Επιστρέφουμε false αν υπάρχει σφάλμα
    return NextResponse.json({ hasVoted: false });
  }
}