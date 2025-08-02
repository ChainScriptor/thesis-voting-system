// components/pages/VoteModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface PollAPI {
  id: number;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
}

interface PollCandidateAPI {
  id: number;            // το poll_candidates.id
  poll_id: number;
  user_id: number;       // ο πραγματικός id του υποψήφιου
  invited_at: string;
  fullName: string;
  email: string | null;
  occupation: string | null;
}

interface TakepartAPI {
  candidateId: number;   // ίδιο με user_id
  numberOfVotes: number;
}

interface CandidateAPI {
  id: number;            // poll_candidates.id, για το key
  poll_id: number;
  candidateId: number;   // user_id, για το vote
  name: string;
  email: string | null;
  occupation: string | null;
  numberOfVotes: number;
}

interface VoteModalProps {
  pollId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVoteSuccess?: () => void;
}

export default function VoteModal({
  pollId,
  open,
  onOpenChange,
  onVoteSuccess,
}: VoteModalProps) {
  const [poll, setPoll] = useState<PollAPI | null>(null);
  const [candidates, setCandidates] = useState<CandidateAPI[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setPoll(null);
      setCandidates([]);
      setSelectedId(null);
      setErrorMsg("");
      return;
    }

    setLoading(true);
    (async () => {
      try {
        // 1) Φόρτωση στοιχείων ψηφοφορίας
        const [resPoll, resInv, resVotes] = await Promise.all([
          fetch(`/api/elections/${pollId}`),
          fetch(`/api/poll-candidates?pollId=${pollId}`),
          fetch(`/api/elections/${pollId}/candidates`),
        ]);

        if (!resPoll.ok || !resInv.ok || !resVotes.ok) {
          throw new Error();
        }

        const pollData: PollAPI = await resPoll.json();
        const invites: PollCandidateAPI[] = await resInv.json();
        const votes: TakepartAPI[] = await resVotes.json();

        setPoll(pollData);

        // 2) Ένωση invites + votes
        const merged = invites.map((inv) => {
          const v = votes.find((x) => x.candidateId === inv.user_id);
          return {
            id: inv.id,
            poll_id: inv.poll_id,
            candidateId: inv.user_id,
            name: inv.fullName,
            email: inv.email,
            occupation: inv.occupation,
            numberOfVotes: v?.numberOfVotes ?? 0,
          } as CandidateAPI;
        });

        setCandidates(merged);
      } catch {
        setErrorMsg("Κάποιο σφάλμα κατά τη φόρτωση.");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, pollId]);

  const handleSubmit = async () => {
    if (selectedId === null) {
      alert("Επιλέξτε υποψήφιο πρώτα.");
      return;
    }
    setLoading(true);
    try {
      const voteRes = await fetch("/api/vote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electionId: Number(pollId),
          candidateId: selectedId,
        }),
      });

      if (!voteRes.ok) {
        if (voteRes.status === 409) {
          alert("Έχετε ήδη ψηφίσει.");
          return;
        }
        throw new Error();
      }
      onOpenChange(false);
      onVoteSuccess?.();
    } catch {
      alert("Σφάλμα κατά την υποβολή της ψήφου.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Συμμετοχή στην ψηφοφορία</DialogTitle>
          <DialogDescription>
            {loading
              ? "Φόρτωση..."
              : errorMsg
              ? errorMsg
              : poll?.title || ""}
          </DialogDescription>
        </DialogHeader>

        <div className="h-px bg-gray-200 my-2" />

        <div className="p-2">
          {loading && (
            <p className="text-center py-4 text-gray-500">
              Φόρτωση υποψηφίων...
            </p>
          )}
          {!loading && !errorMsg && poll && (
            <>
              <p className="text-sm text-gray-600">{poll.description}</p>
              <p className="text-xs text-gray-500 mb-4">
                Έναρξη:{" "}
                {format(new Date(poll.dateRange.startDate), "dd/MM/yyyy")} –{" "}
                Λήξη:{" "}
                {format(new Date(poll.dateRange.endDate), "dd/MM/yyyy")}
              </p>

              {candidates.length === 0 ? (
                <p className="text-center py-6 text-gray-500">
                  Δεν υπάρχουν υποψήφιοι.
                </p>
              ) : (
                <RadioGroup
                  value={String(selectedId ?? "")}
                  onValueChange={(v) => setSelectedId(Number(v))}
                  className="grid gap-2"
                >
                  {candidates.map((c) => (
                    <label
                      key={c.id}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50 cursor-pointer",
                        selectedId === c.candidateId
                          ? "border-black bg-gray-100"
                          : "border-gray-200"
                      )}
                    >
                      <RadioGroupItem value={String(c.candidateId)} />
                      <div className="flex-1">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-gray-500">
                          {c.email ?? "-"} · {c.occupation ?? "-"}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        ({c.numberOfVotes} ψήφοι)
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              )}
            </>
          )}
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Άκυρο
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !poll || candidates.length === 0}
          >
            Υποβολή ψήφου
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
