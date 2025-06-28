// app/api/vote/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface VoteBody {
  electionId: number;
  candidateId: number;
}

export async function POST(request: Request) {
  try {
    // 1) Ελέγχουμε αν ο χρήστης είναι authenticated και βρίσκουμε το real User ID
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    const realUserId = user.id;

    // 2) Διαβάζουμε το σώμα του request
    const body: VoteBody = await request.json();
    const { electionId, candidateId } = body;
    if (
      typeof electionId !== "number" ||
      typeof candidateId !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid payload: electionId and candidateId must be numbers." },
        { status: 400 }
      );
    }

    // 3) Ελέγχουμε πρώτα αν ο χρήστης έχει ήδη ψηφίσει αυτήν την εκλογή
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_electionId: {
          userId: realUserId,
          electionId,
        },
      },
    });
    if (existingVote) {
      // Αν έχει ήδη ψηφίσει, επιστρέφουμε Conflict (409)
      return NextResponse.json(
        { error: "User has already voted" },
        { status: 409 }
      );
    }

    // 4) Ελέγχουμε αν υπάρχει ήδη εγγραφή στο takepart για το συγκεκριμένο ζευγάρι (electionId, candidateId).
    const existingTakePart = await prisma.takepart.findUnique({
      where: {
        electionId_candidateId: {
          electionId,
          candidateId,
        },
      },
    });

    let updatedTakePart;
    if (existingTakePart) {
      // Αν υπάρχει ήδη, αυξάνουμε απλώς το numberOfVotes κατά 1
      updatedTakePart = await prisma.takepart.update({
        where: {
          electionId_candidateId: {
            electionId,
            candidateId,
          },
        },
        data: {
          numberOfVotes: existingTakePart.numberOfVotes + 1,
        },
      });
    } else {
      // Αν δεν υπάρχει, δημιουργούμε νέο row στη takepart με numberOfVotes = 1
      updatedTakePart = await prisma.takepart.create({
        data: {
          electionId,
          candidateId,
          numberOfVotes: 1,
        },
      });
    }

    // 5) Καταγράφουμε την ψήφο στον πίνακα Vote ώστε να μην ψηφίσει ξανά αυτός ο χρήστης
    await prisma.vote.create({
      data: {
        userId: realUserId,
        electionId,
        candidateId,
      },
    });

    // 6) Επιστρέφουμε επιτυχία μαζί με τα στοιχεία του takepart που ενημερώθηκε/δημιουργήθηκε
    return NextResponse.json(
      { success: true, takepart: updatedTakePart },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("POST /api/vote error:", error);

    // Αν το σφάλμα προέρχεται από P2002 (Unique constraint), επιστρέφουμε 409
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: unknown }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "User has already voted" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to record vote." },
      { status: 500 }
    );
  }
}
