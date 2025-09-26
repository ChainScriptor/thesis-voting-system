// components/pages/PollResultsTabs.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Result {
  candidateId: number;
  candidateName: string;
  votes: number;
}

interface Props {
  pollId: string;
  onClose: () => void;
}

export default function PollResultsTabs({ pollId, onClose }: Props) {
  const fetchResults = async (): Promise<Result[]> => {
    const res = await fetch(`/api/elections/${pollId}/results`);
    if (!res.ok) throw new Error("Network response was not ok");
    const json = await res.json();
    return json.results as Result[];
  };

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery<Result[], Error>({
    queryKey: ["poll-results", pollId],
    queryFn: fetchResults,
    enabled: Boolean(pollId),
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (pollId) refetch();
  }, [pollId, refetch]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          ×
        </Button>

        <h2 className="text-xl font-bold mb-4">Αποτελέσματα Ψηφοφορίας</h2>

        {isLoading && <p>Φόρτωση…</p>}
        {isError && (
          <p className="text-red-500">Σφάλμα στην ανάκτηση των αποτελεσμάτων.</p>
        )}

        {data && (
          <ul className="space-y-2">
            {(() => {
              // Βρίσκουμε τον μέγιστο αριθμό ψήφων
              const maxVotes = Math.max(...data.map(r => r.votes));
              // Βρίσκουμε πόσοι έχουν τον μέγιστο αριθμό ψήφων
              const winnersCount = data.filter(r => r.votes === maxVotes).length;
              const isTie = winnersCount > 1;

              return data.map((r, idx) => {
                const isWinner = r.votes === maxVotes;
                const isFirstWinner = isWinner && idx === data.findIndex(candidate => candidate.votes === maxVotes);

                return (
                  <li
                    key={r.candidateId}
                    className={`flex justify-between items-center border rounded p-3 ${isWinner
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      }`}
                  >
                    <span className="font-medium">
                      {isWinner && isFirstWinner ? (isTie ? "🤝 " : "🏆 ") : ""}
                      {r.candidateName}
                      {isWinner && isFirstWinner && isTie ? " (Ισσοπαλία)" : ""}
                    </span>
                    <span>{r.votes} ψήφοι</span>
                  </li>
                );
              });
            })()}
          </ul>
        )}
      </div>
    </div>
  );
}
