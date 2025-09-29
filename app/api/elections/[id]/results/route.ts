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
      let candidateName = 'Unknown';

      if (pc.candidate_type === 'user' && pc.user) {
        candidateName = pc.user.fullName || pc.user.email || 'Unknown User';
      } else if (pc.candidate_type === 'text' && pc.text_option) {
        candidateName = pc.text_option;
      } else if (pc.text_option) {
        candidateName = pc.text_option;
      }

      candidateMap.set(pc.id, {
        id: pc.id,
        name: candidateName,
        type: pc.candidate_type
      });
    });

    // format σε array { candidateId, candidateName, votes }
    const results = takepart.map((tp, index) => {
      // Try to find candidate by candidateId first
      let candidate = candidateMap.get(tp.candidateId);

      // If not found, use fallback logic to match by order
      if (!candidate && pollCandidates.length > 0) {
        // Match by order: first takepart record gets first candidate, etc.
        const fallbackCandidate = pollCandidates[index] || pollCandidates[0];
        candidate = {
          id: fallbackCandidate.id,
          name: fallbackCandidate.user?.fullName || fallbackCandidate.text_option || 'Unknown',
          type: fallbackCandidate.candidate_type
        };
      }

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
