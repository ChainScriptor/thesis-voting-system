// src/services/pollService.ts

import type { Poll, Candidate } from "@/types/poll";

/**
 * Φέρνει όλες τις εκλογές από /api/elections
 */
export async function getPolls(): Promise<Poll[]> {
  const res = await fetch("/api/elections");
  if (!res.ok) {
    throw new Error(`Failed to fetch polls: ${res.status}`);
  }
  return res.json();
}

/**
 * Φέρνει μία εκλογή από /api/elections/[id]
 */
export async function getPoll(id: string): Promise<Poll> {
  const res = await fetch(`/api/elections/${id}`);
  if (!res.ok) {
    throw new Error(`Poll not found: ${res.status}`);
  }
  return res.json();
}

/**
 * Φέρνει τους υποψήφιους από /api/elections/[id]/candidates
 */
export async function getCandidates(pollId: string): Promise<Candidate[]> {
  const res = await fetch(`/api/elections/${pollId}/candidates`);
  if (!res.ok) {
    throw new Error(`Failed to fetch candidates: ${res.status}`);
  }
  return res.json();
}

/**
 * Προσθέτει υποψήφιο στη βάση μέσω /api/candidates
 */
type CandidateData = {
  name: string;
  email: string;
  position?: string;
  imageUrl?: string;
};

export async function addCandidate(
  pollId: string,
  candidateData: CandidateData
): Promise<Candidate> {
  const res = await fetch("/api/candidates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...candidateData, pollId }),
  });
  if (!res.ok) {
    throw new Error(`Failed to add candidate: ${res.status}`);
  }
  return res.json();
}

/**
 * Αφαιρεί υποψήφιο με DELETE /api/elections/[pollId]/candidates/[candidateId]
 */
export async function removeCandidate(
  pollId: string,
  candidateId: number
): Promise<void> {
  const res = await fetch(
    `/api/elections/${pollId}/candidates/${candidateId}`,
    { method: "DELETE" }
  );
  if (!res.ok) {
    throw new Error(`Failed to remove candidate: ${res.status}`);
  }
}

export default {
  getPolls,
  getPoll,
  getCandidates,
  addCandidate,
  removeCandidate,
};
