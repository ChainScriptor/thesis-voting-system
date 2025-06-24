import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const rawId = segments[3];
  const electionId = parseInt(rawId, 10);

  if (isNaN(electionId)) {
    return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
  }

  try {
    const session = await auth();
    const clerkId = session.userId;

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Βρίσκουμε τον χρήστη μας από τη βάση
    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not registered" }, { status: 404 });
    }

    // Βρίσκουμε την ψηφοφορία
    const election = await prisma.election.findUnique({
      where: { id: electionId },
      select: { userId: true },
    });

    if (!election) {
      return NextResponse.json({ error: "Election not found" }, { status: 404 });
    }

    // Έλεγχος αν είναι δημιουργός
    if (election.userId !== dbUser.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Διαγραφή
    await prisma.election.delete({
      where: { id: electionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/elections/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete election" }, { status: 500 });
  }
}
