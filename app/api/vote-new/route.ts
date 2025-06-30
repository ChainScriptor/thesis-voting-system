import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface VoteBody {
  electionId: number;
  candidateId: number; // This is the user_id of the candidate being voted for
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

    // 4) Βρίσκουμε το candidate ID που αντιστοιχεί στο user_id που ψηφίζουμε
    const candidateUser = await prisma.user.findUnique({
      where: { id: candidateId },
    });

    if (!candidateUser) {
      return NextResponse.json(
        { error: "Candidate user not found" },
        { status: 404 }
      );
    }

    // Βρίσκουμε το candidate record που αντιστοιχεί σε αυτόν τον user
    const candidate = await prisma.candidate.findFirst({
      where: { clerkId: candidateUser.clerkId },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    // 5) Ελέγχουμε αν υπάρχει ήδη εγγραφή στο takepart για το συγκεκριμένο ζευγάρι (electionId, candidateId).
    const existingTakePart = await prisma.takepart.findUnique({
      where: {
        electionId_candidateId: {
          electionId,
          candidateId: candidate.id, // Use the actual candidate ID from candidate table
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
            candidateId: candidate.id,
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
          candidateId: candidate.id,
          numberOfVotes: 1,
        },
      });
    }

    // 6) Καταγράφουμε την ψήφο στον πίνακα Vote ώστε να μην ψηφίσει ξανά αυτός ο χρήστης
    await prisma.vote.create({
      data: {
        userId: realUserId,
        electionId,
        candidateId: candidate.id, // Use the actual candidate ID
      },
    });

    // 7) Επιστρέφουμε επιτυχία μαζί με τα στοιχεία του takepart που ενημερώθηκε/δημιουργήθηκε
    return NextResponse.json(
      { success: true, takepart: updatedTakePart },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("POST /api/vote-new error:", error);

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