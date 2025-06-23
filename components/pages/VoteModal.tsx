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

interface CandidateAPI {
  id: number;          // poll_candidates.id
  poll_id: number;
  user_id: number;
  invited_at: string;
  fullName: string;
  email: string;
  occupation: string | null;
}

interface PollAPI {
  id: number;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
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
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setPoll(null);
      setCandidates([]);
      setSelectedCandidate("");
      setErrorMsg("");
      return;
    }

    setLoading(true);
    (async () => {
      try {
        // 1) Load poll data
        const res = await fetch(`/api/elections/${pollId}`);
        if (!res.ok) throw new Error();
        const found = await res.json();
        setPoll({
          id: found.id,
          title: found.title,
          description: found.description,
          dateRange: found.dateRange,
        });

        // 2) Load candidates
        const rc = await fetch(`/api/elections/${pollId}/candidates`);
        if (!rc.ok) throw new Error();
        const cd = (await rc.json()) as CandidateAPI[];
        setCandidates(cd);
      } catch {
        setErrorMsg("Κάποιο σφάλμα συνέβη κατά τη φόρτωση.");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, pollId]);

  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      alert("Επιλέξτε πρώτα υποψήφιο.");
      return;
    }
    try {
      const electionIdNum = Number(pollId);
      const pollCandidateIdNum = Number(selectedCandidate);

      // sync to get real candidateId
      const sync = await fetch("/api/poll-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollCandidateId: pollCandidateIdNum }),
      });
      if (!sync.ok) throw new Error();
      const { candidateId } = await sync.json();

      // submit vote
      const vr = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ electionId: electionIdNum, candidateId }),
      });
      if (!vr.ok) {
        if (vr.status === 409) {
          alert("Έχετε ήδη ψηφίσει σε αυτή την ψηφοφορία.");
          return;
        }
        throw new Error();
      }
      await vr.json();

      onOpenChange(false);
      onVoteSuccess?.();
    } catch {
      alert("Υπήρξε σφάλμα κατά την αποθήκευση της ψήφου.");
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
                {format(new Date(poll.dateRange.startDate), "dd/MM/yyyy")} Λήξη:{" "}
                {format(new Date(poll.dateRange.endDate), "dd/MM/yyyy")}
              </p>
              {candidates.length === 0 ? (
                <p className="text-center py-6 text-gray-500">
                  Δεν υπάρχουν υποψήφιοι.
                </p>
              ) : (
                <RadioGroup
                  value={selectedCandidate}
                  onValueChange={setSelectedCandidate}
                  className="grid gap-2"
                >
                  {candidates.map((c) => (
                    <label
                      key={c.id}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50 cursor-pointer",
                        selectedCandidate === String(c.id)
                          ? "border-black bg-gray-100"
                          : "border-gray-200"
                      )}
                    >
                      <RadioGroupItem value={String(c.id)} />
                      <div className="flex-1">
                        <p className="font-medium">{c.fullName}</p>
                        <p className="text-xs text-gray-500">
                          {c.email} · {c.occupation ?? "-"}
                        </p>
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
            onClick={handleSubmitVote}
            disabled={loading || !poll || candidates.length === 0}
          >
            Υποβολή ψήφου
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
