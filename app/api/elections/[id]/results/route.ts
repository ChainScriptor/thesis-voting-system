// app/api/elections/[id]/results/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // πάρε το id από το path
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const rawId = parts[parts.length - 2]; // το [id] φάκελος
    const electionId = parseInt(rawId, 10);
    if (isNaN(electionId)) {
      return NextResponse.json({ error: "Invalid election id" }, { status: 400 });
    }

    // φέρε όλα τα takeparts (που έχουν numberOfVotes) με τον υποψήφιο
    const takepart = await prisma.takepart.findMany({
      where: { electionId },
      include: {
        user: {
          select: { id: true, fullName: true }
        }
      },
      orderBy: { numberOfVotes: "desc" }
    });

    // format σε array { candidateId, candidateName, votes }
    const results = takepart.map((tp) => ({
      candidateId: tp.user.id,
      candidateName: tp.user.fullName,
      votes: tp.numberOfVotes,
    }));

    return NextResponse.json({ results });
  } catch (err) {
    console.error("GET /api/elections/[id]/results error:", err);
    return NextResponse.json({ error: "Could not load results" }, { status: 500 });
  }
}
