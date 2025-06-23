// types/electionCandidate.ts
export interface ElectionCandidate {
  id: number;            // το poll‐candidate id
  poll_id: number;       // το electionId
  candidateId: number;   // το πραγματικό id του candidate
  numberOfVotes: number;
  name: string;
  description: string | null;
  image: string | null;
  is_person: boolean;
  clerkId: string | null;
}
