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

    // φέρε όλα τα takeparts (που έχουν numberOfVotes) με τους υποψηφίους
    const takepart = await prisma.takepart.findMany({
      where: { electionId },
      orderBy: { numberOfVotes: "desc" }
    });

    // φέρε όλους τους υποψηφίους για να πάρουμε τα ονόματα
    const pollCandidates = await prisma.poll_candidates.findMany({
      where: { poll_id: electionId },
      include: { user: true }
    });

    // δημιούργησε ένα map για γρήγορη αναζήτηση
    const candidateMap = new Map();
    pollCandidates.forEach(pc => {
      candidateMap.set(pc.id, {
        id: pc.id,
        name: pc.user?.fullName || pc.text_option || 'Unknown',
        type: pc.candidate_type
      });
    });

    // format σε array { candidateId, candidateName, votes }
    const results = takepart.map((tp) => {
      const candidate = candidateMap.get(tp.candidateId);
      return {
        candidateId: tp.candidateId,
        candidateName: candidate?.name || 'Unknown',
        candidateType: candidate?.type || 'unknown',
        votes: tp.numberOfVotes,
      };
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("GET /api/elections/[id]/results error:", err);
    return NextResponse.json({ error: "Could not load results" }, { status: 500 });
  }
}
