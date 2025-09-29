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
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface PollAPI {
  id: number;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
  voting_type?: string;
  access_code?: string | null;
  candidates: Array<{
    id: number;               // PK από το candidate table
    name?: string;            // Για backward compatibility
    fullName?: string;        // Νέο πεδίο από το API
    email: string | null;
    occupation: string | null;
    numberOfVotes?: number;
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
  const [accessCode, setAccessCode] = useState("");
  const [showAccessCodeForm, setShowAccessCodeForm] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!open) {
      setPoll(null);
      setSelectedId(null);
      setErrorMsg("");
      setAccessCode("");
      setShowAccessCodeForm(false);
      setHasVoted(false);
      return;
    }

    // Έλεγχος αν ο χρήστης έχει ήδη ψηφίσει αυτή την ψηφοφορία από τη βάση δεδομένων
    fetch(`/api/vote/status?electionId=${pollId}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(({ hasVoted }) => {
        setHasVoted(hasVoted);
        if (!hasVoted) {
          setLoading(true);
          fetch(`/api/elections/${pollId}`, { credentials: "include" })
            .then((r) => r.json())
            .then((data) => {
              setPoll(data);
              // Αν είναι ιδιωτική ψηφοφορία, εμφάνισε τη φόρμα κωδικού πρόσβασης
              if (data.voting_type === "private") {
                setShowAccessCodeForm(true);
              }
              setLoading(false);
            })
            .catch(() => {
              setErrorMsg("Σφάλμα κατά τη φόρτωση της ψηφοφορίας.");
              setLoading(false);
            });
        }
      })
      .catch(() => {
        setHasVoted(false);
        setLoading(true);
        fetch(`/api/elections/${pollId}`, { credentials: "include" })
          .then((r) => r.json())
          .then((data) => {
            setPoll(data);
            setLoading(false);
          })
          .catch(() => {
            setErrorMsg("Σφάλμα κατά τη φόρτωση της ψηφοφορίας.");
            setLoading(false);
          });
      });
  }, [open, pollId]);

  const handleAccessCodeSubmit = () => {
    if (!poll?.access_code) return;

    if (accessCode.trim() === poll.access_code) {
      setShowAccessCodeForm(false);
      setErrorMsg("");
    } else {
      setErrorMsg("Λάθος κωδικός πρόσβασης. Παρακαλώ δοκιμάστε ξανά.");
    }
  };

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
        credentials: 'include',
        body: JSON.stringify({
          electionId: Number(pollId),
          candidateId: selectedId,
          accessCode: poll?.access_code || null,
        }),
      });

      if (!voteRes.ok) {
        const errorData = await voteRes.json().catch(() => ({}));
        console.error('Vote submission failed:', voteRes.status, errorData);

        if (voteRes.status === 409) {
          alert("Έχετε ήδη ψηφίσει.");
          return;
        }

        if (voteRes.status === 403) {
          alert("Λάθος κωδικός πρόσβασης ή δεν έχετε δικαίωμα συμμετοχής.");
          return;
        }

        const errorMessage = errorData.error || `HTTP ${voteRes.status}: ${voteRes.statusText}`;
        throw new Error(errorMessage);
      }

      // Επιτυχής ψηφοφορία - κλείσιμο modal
      await voteRes.json();

      // Κλείσιμο modal και callback
      onOpenChange(false);
      onVoteSuccess?.();
    } catch (error) {
      alert(`Σφάλμα κατά την υποβολή της ψήφου: ${error.message}`);
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

              {/* Μήνυμα αν ο χρήστης έχει ήδη ψηφίσει */}
              {hasVoted && (
                <div className="mb-6 p-4 border border-green-200 bg-green-50 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800 mb-2">
                    ✅ Έχετε ήδη ψηφίσει
                  </h3>
                  <p className="text-xs text-green-700">
                    Έχετε ήδη συμμετάσχει σε αυτή την ψηφοφορία. Ευχαριστούμε για τη συμμετοχή σας!
                  </p>
                </div>
              )}

              {/* Φόρμα κωδικού πρόσβασης - μόνο για ιδιωτικές ψηφοφορίες */}
              {showAccessCodeForm && poll?.voting_type === "private" && (
                <div className="mb-6 p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">
                    🔒 Αυτή η ψηφοφορία είναι ιδιωτική
                  </h3>
                  <p className="text-xs text-orange-700 mb-3">
                    Εισάγετε τον κωδικό πρόσβασης για να συμμετάσχετε.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Εισάγετε τον κωδικό πρόσβασης"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAccessCodeSubmit()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleAccessCodeSubmit}
                      disabled={!accessCode.trim()}
                      size="sm"
                    >
                      Επιβεβαίωση
                    </Button>
                  </div>
                  {errorMsg && (
                    <p className="text-sm text-red-600 mt-2">{errorMsg}</p>
                  )}
                </div>
              )}

              {/* Ειδικές μηνύματα για διαφορετικούς τύπους ψηφοφοριών */}
              {poll?.voting_type === "invitation_only" && (
                <div className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    📧 Ψηφοφορία για προσκεκλημένους
                  </h3>
                  <p className="text-xs text-blue-700">
                    Αυτή η ψηφοφορία είναι διαθέσιμη μόνο για προσκεκλημένους χρήστες.
                  </p>
                </div>
              )}

              {poll?.voting_type === "restricted" && (
                <div className="mb-6 p-4 border border-purple-200 bg-purple-50 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">
                    🎯 Περιορισμένη ψηφοφορία
                  </h3>
                  <p className="text-xs text-purple-700">
                    Αυτή η ψηφοφορία έχει περιορισμούς βάσει προφίλ χρήστη.
                  </p>
                </div>
              )}

              {/* Εμφάνιση υποψηφίων μόνο αν δεν είναι ιδιωτική ψηφοφορία ή αν έχει εισάγει σωστό κωδικό */}
              {poll.voting_type === "private" && showAccessCodeForm ? (
                <div className="text-center py-6 text-gray-500">
                  <p>Εισάγετε τον κωδικό πρόσβασης για να δείτε τους υποψηφίους.</p>
                </div>
              ) : poll.candidates.length === 0 ? (
                <p className="text-center py-6 text-gray-500">
                  Δεν υπάρχουν υποψήφιοι.
                </p>
              ) : (
                <div className="space-y-2">
                  {poll.candidates.map((c) => (
                    <label
                      key={c.id}
                      htmlFor={`cand-${c.id}`}
                      className={`flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${selectedId === c.id
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
                        <p className="font-medium">{c.fullName || c.name || `Υποψήφιος ${c.id}`}</p>
                        <p className="text-xs text-gray-500">
                          {c.email ?? "-"} · {c.occupation ?? "-"}
                        </p>
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
            disabled={loading || !poll || selectedId === null || showAccessCodeForm || hasVoted}
          >
            {hasVoted ? "Έχετε ήδη ψηφίσει" : "Υποβολή ψήφου"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
