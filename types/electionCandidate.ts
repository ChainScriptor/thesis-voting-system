// types/electionCandidate.ts
export interface ElectionCandidate {
  id: number;            // το poll‐candidate id
  poll_id: number;       // το electionId
  numberOfVotes: number;
  name: string;
  description: string | null;
  image: string | null;
  is_person: boolean;
  clerkId: string | null;
}
