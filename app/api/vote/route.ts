// app/api/vote/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface VoteBody {
  electionId: number;
  candidateId: number;
  accessCode?: string | null;
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
    const { electionId, candidateId, accessCode } = body;
    if (
      typeof electionId !== "number" ||
      typeof candidateId !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid payload: electionId and candidateId must be numbers." },
        { status: 400 }
      );
    }

    // 2.5) Ελέγχουμε τον τύπο ψηφοφορίας και τα δικαιώματα πρόσβασης
    const election = await prisma.election.findUnique({
      where: { id: electionId },
      select: {
        access_code: true,
        voting_type: true,
        target_occupation: true,
        target_location: true,
        target_gender: true,
        birthdate_min: true,
        birthdate_max: true
      }
    });

    if (!election) {
      return NextResponse.json(
        { error: "Election not found" },
        { status: 404 }
      );
    }

    // Έλεγχος βάσει τύπου ψηφοφορίας
    if (election.voting_type === "private") {
      // Ιδιωτική ψηφοφορία - απαιτείται κωδικός
      if (!election.access_code || election.access_code !== accessCode) {
        return NextResponse.json(
          { error: "Invalid access code for private election" },
          { status: 403 }
        );
      }
    } else if (election.voting_type === "invitation_only") {
      // Προσκεκλημένοι - ελέγχουμε αν ο χρήστης είναι προσκεκλημένος
      const invitation = await prisma.election_invitations.findFirst({
        where: {
          electionId: electionId,
          userId: realUserId
        }
      });

      if (!invitation) {
        return NextResponse.json(
          { error: "You are not invited to this election" },
          { status: 403 }
        );
      }
    } else if (election.voting_type === "restricted") {
      // Περιορισμένη - ελέγχουμε τα targeting criteria (πιο ευέλικτα)
      const userProfile = await prisma.user.findUnique({
        where: { id: realUserId },
        select: {
          occupation: true,
          location: true,
          gender: true,
          birthdate: true
        }
      });

      if (!userProfile) {
        return NextResponse.json(
          { error: "User profile not found" },
          { status: 404 }
        );
      }

      // Έλεγχος targeting criteria (πιο ευέλικτος)
      // Αν δεν έχει κανένα criteria, επιτρέπει την ψήφο
      const hasAnyCriteria = election.target_occupation || election.target_location ||
        election.target_gender || election.birthdate_min || election.birthdate_max;

      if (hasAnyCriteria) {
        // Έλεγχος αν τουλάχιστον ένα criteria ταιριάζει
        const occupationMatch = !election.target_occupation ||
          election.target_occupation === "all" ||
          userProfile.occupation === election.target_occupation;

        const locationMatch = !election.target_location ||
          election.target_location === "all" ||
          userProfile.location === election.target_location;

        const genderMatch = !election.target_gender ||
          election.target_gender === "all" ||
          userProfile.gender === election.target_gender;

        const ageMatch = (!election.birthdate_min || !userProfile.birthdate || userProfile.birthdate >= election.birthdate_min) &&
          (!election.birthdate_max || !userProfile.birthdate || userProfile.birthdate <= election.birthdate_max);

        // Αν κανένα criteria δεν ταιριάζει, απορρίπτει
        if (!occupationMatch && !locationMatch && !genderMatch && !ageMatch) {
          return NextResponse.json(
            { error: "User does not match any election criteria" },
            { status: 403 }
          );
        }
      }
      // Αν δεν έχει criteria, επιτρέπει την ψήφο
    }
    // Για "public" ψηφοφορίες, δεν χρειάζεται έλεγχος

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

    // 4) Βρίσκουμε το poll_candidate για να δούμε αν είναι user ή text-based
    console.log("Looking for poll_candidate with id:", candidateId);
    const pollCandidate = await prisma.poll_candidates.findUnique({
      where: { id: candidateId },
      include: { user: true }
    });

    console.log("Found poll_candidate:", pollCandidate);

    if (!pollCandidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    // 5) Ελέγχουμε αν υπάρχει ήδη εγγραφή στο takepart για το συγκεκριμένο ζευγάρι (electionId, candidateId).
    console.log("Looking for existing takepart with electionId:", electionId, "candidateId:", candidateId);
    const existingTakePart = await prisma.takepart.findUnique({
      where: {
        electionId_candidateId: {
          electionId,
          candidateId,
        },
      },
    });

    console.log("Found existing takepart:", existingTakePart);

    let updatedTakePart;
    if (existingTakePart) {
      // Αν υπάρχει ήδη, αυξάνουμε απλώς το numberOfVotes κατά 1
      console.log("Updating existing takepart...");
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
      console.log("Updated takepart:", updatedTakePart);
    } else {
      // Αν δεν υπάρχει, δημιουργούμε νέο row στη takepart με numberOfVotes = 1
      console.log("Creating new takepart with electionId:", electionId, "candidateId:", candidateId);

      try {
        updatedTakePart = await prisma.takepart.create({
          data: {
            electionId,
            candidateId, // Χρησιμοποιούμε πάντα το poll_candidates.id
            numberOfVotes: 1,
          },
        });
        console.log("Created takepart:", updatedTakePart);
      } catch (createError) {
        console.error("Error creating takepart:", createError);
        throw createError;
      }
    }

    // 6) Καταγράφουμε την ψήφο στον πίνακα Vote ώστε να μην ψηφίσει ξανά αυτός ο χρήστης
    console.log("Creating vote with userId:", realUserId, "electionId:", electionId, "candidateId:", candidateId);

    try {
      await prisma.vote.create({
        data: {
          userId: realUserId,
          electionId,
          candidateId,
        },
      });
      console.log("Vote created successfully");
    } catch (voteError) {
      console.error("Error creating vote:", voteError);
      console.error("Vote error details:", {
        message: voteError.message,
        code: voteError.code,
        meta: voteError.meta
      });
      throw voteError;
    }

    // 7) Επιστρέφουμε επιτυχία μαζί με τα στοιχεία του takepart που ενημερώθηκε/δημιουργήθηκε
    return NextResponse.json(
      { success: true, takepart: updatedTakePart },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Αν είναι database connection error, επιστρέφουμε 500 με μήνυμα
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P1001') {
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

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
