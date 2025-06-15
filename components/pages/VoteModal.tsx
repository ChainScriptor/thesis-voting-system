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
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { format } from "date-fns";

interface CandidateAPI {
  id: number;          // corresponds to poll_candidates.id
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
  pollId: string;             // electionId as string
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VoteModal({ pollId, open, onOpenChange }: VoteModalProps) {
  const [poll, setPoll] = useState<PollAPI | null>(null);
  const [candidates, setCandidates] = useState<CandidateAPI[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string>(""); // holds poll_candidates.id
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!open) {
      // Όταν κλείνει το modal, καθαρίζουμε το state
      setPoll(null);
      setCandidates([]);
      setSelectedCandidate("");
      setErrorMsg("");
      return;
    }

   const fetchData = async () => {
  setLoading(true);
  try {
    // 1) Φέρνουμε μόνο τη συγκεκριμένη ψηφοφορία
    const res = await fetch(`/api/elections/${pollId}`);
    if (!res.ok) throw new Error("Η ψηφοφορία δεν βρέθηκε.");
    const found = await res.json();

    setPoll({
      id: found.id,
      title: found.title,
      description: found.description,
      dateRange: found.dateRange,
    });

    // 2) Φέρνουμε τους υποψήφιους από `poll-candidates`
    const resCands = await fetch(`/api/poll-candidates?pollId=${pollId}`);
    if (!resCands.ok) throw new Error("Failed to fetch candidates");
    const candsData: CandidateAPI[] = await resCands.json();
    setCandidates(candsData);
  } catch (err) {
    console.error(err);
    setErrorMsg("Κάποιο σφάλμα συνέβη κατά τη φόρτωση.");
  } finally {
    setLoading(false);
  }
};

    fetchData();
  }, [open, pollId]);

  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      alert("Επιλέξτε πρώτα υποψήφιο.");
      return;
    }

    try {
      const electionIdNum = Number(pollId);
      const pollCandidateIdNum = Number(selectedCandidate); // αυτό είναι poll_candidates.id

      // ───────────────────────────────────────────
      // 1) Καλούμε το νέο endpoint για να πάρουμε το σωστό candidate.id
      // ───────────────────────────────────────────
      const syncRes = await fetch("/api/poll-candidates/sync-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollCandidateId: pollCandidateIdNum }),
      });
      if (!syncRes.ok) {
        throw new Error("Failed to sync candidate");
      }
      const syncJson = await syncRes.json();
      const candidateIdNum: number = syncJson.candidateId;
      if (typeof candidateIdNum !== "number") {
        throw new Error("Invalid candidateId returned from sync");
      }

      // ───────────────────────────────────────────
      // 2) Τώρα κάνουμε POST στο /api/vote με το σωστό candidate.id
      // ───────────────────────────────────────────
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          electionId: electionIdNum,
          candidateId: candidateIdNum,
        }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          alert("Έχετε ήδη ψηφίσει σε αυτή την ψηφοφορία.");
        } else {
          throw new Error("Failed to submit vote");
        }
        return;
      }

      const json = await res.json();
      console.log("Vote recorded:", json);
      onOpenChange(false);
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert("Υπήρξε σφάλμα κατά την αποθήκευση της ψήφου.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Συμμετοχή στην ψηφοφορία</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-3 top-3 rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
          <DialogDescription>
            {loading
              ? "Φόρτωση..."
              : errorMsg
              ? errorMsg
              : poll
              ? poll.title
              : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="h-px bg-gray-200 my-2" />

        <div className="p-2">
          {loading && (
            <p className="text-center py-4 text-gray-500">
              Φόρτωση υποψηφίων...
            </p>
          )}
          {!loading && errorMsg && (
            <p className="text-center py-4 text-red-500">{errorMsg}</p>
          )}
          {!loading && !errorMsg && poll && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">{poll.description}</p>
              <p className="text-xs text-gray-500 mb-4">
                Έναρξη:{" "}
                {format(new Date(poll.dateRange.startDate), "dd/MM/yyyy")} Λήξη:{" "}
                {format(new Date(poll.dateRange.endDate), "dd/MM/yyyy")}
              </p>

              {candidates.length === 0 ? (
                <p className="text-center py-6 text-gray-500">
                  Δεν υπάρχουν υποψήφιοι.
                </p>
              ) : (
                <RadioGroup
                  value={selectedCandidate}
                  onValueChange={(val) => setSelectedCandidate(val)}
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
                          {c.email} {" · "} {c.occupation ?? "-"}
                        </p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              )}
            </div>
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
