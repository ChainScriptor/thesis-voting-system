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
  id: number;             // το poll_candidates.id
  poll_id: number;
  candidateId: number;    // πραγματικό id του candidate
  numberOfVotes: number;
  name: string;
  email: string | null;
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
        // 1) Φόρτωσε τα βασικά της ψηφοφορίας
        const res = await fetch(`/api/elections/${pollId}`);
        if (!res.ok) throw new Error();
        const e = await res.json();
        setPoll({
          id: e.id,
          title: e.title,
          description: e.description,
          dateRange: e.dateRange,
        });

        // 2) Φόρτωσε τους υποψήφιους
        const rc = await fetch(`/api/elections/${pollId}/candidates`);
        if (!rc.ok) throw new Error();
        const cd: CandidateAPI[] = await rc.json();
        setCandidates(cd);
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
    try {
      // sync candidate (poll-candidates → candidateId)
      const syncRes = await fetch("/api/poll-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollCandidateId: selectedId }),
      });
      if (!syncRes.ok) throw new Error();
      const { candidateId } = await syncRes.json();

      // κάνε το vote
      const voteRes = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electionId: Number(pollId),
          candidateId,
        }),
      });
      if (!voteRes.ok) {
        if (voteRes.status === 409) {
          alert("Έχετε ήδη ψηφίσει.");
          return;
        }
        throw new Error();
      }
      await voteRes.json();
      onOpenChange(false);
      onVoteSuccess?.();
    } catch {
      alert("Σφάλμα κατά την υποβολή της ψήφου.");
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
                {format(new Date(poll.dateRange.startDate), "dd/MM/yyyy")} – Λήξη:{" "}
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
                        selectedId === c.id
                          ? "border-black bg-gray-100"
                          : "border-gray-200"
                      )}
                    >
                      <RadioGroupItem value={String(c.id)} />
                      <div className="flex-1">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-gray-500">
                          {c.email ?? "-"} · {c.occupation ?? "-"}
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
