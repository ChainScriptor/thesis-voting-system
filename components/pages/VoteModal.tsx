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
import { format } from "date-fns";

interface PollAPI {
  id: number;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
  candidates: Array<{
    id: number;               // PK από το candidate table
    name: string;
    email: string | null;
    occupation: string | null;
    numberOfVotes: number;
  }>;
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
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setPoll(null);
      setSelectedId(null);
      setErrorMsg("");
      return;
    }
    setLoading(true);

    fetch(`/api/elections/${pollId}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: PollAPI) => {
        setPoll(data);
      })
      .catch(() => {
        setErrorMsg("Κάποιο σφάλμα κατά τη φόρτωση.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [open, pollId]);

  const handleSubmit = async () => {
    if (selectedId === null) {
      alert("Επιλέξτε υποψήφιο πρώτα.");
      return;
    }
    setLoading(true);
    try {
      const voteRes = await fetch("/api/vote", {
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

              {poll.candidates.length === 0 ? (
                <p className="text-center py-6 text-gray-500">
                  Δεν υπάρχουν υποψήφιοι.
                </p>
              ) : (
                <div className="space-y-2">
                  {poll.candidates.map((c) => (
                    <label
                      key={c.id}
                      htmlFor={`cand-${c.id}`}
                      className={`flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                        selectedId === c.id
                          ? "border-black bg-gray-100"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        id={`cand-${c.id}`}
                        type="radio"
                        name="candidate"
                        value={c.id}
                        checked={selectedId === c.id}
                        onChange={() => setSelectedId(c.id)}
                        className="mr-3 h-4 w-4"
                      />
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
                </div>
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
            disabled={loading || !poll || selectedId === null}
          >
            Υποβολή ψήφου
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
