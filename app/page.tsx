// app/page.tsx
"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Vote } from "lucide-react";
import { format, isAfter } from "date-fns";
import VoteModal from "@/components/pages/VoteModal";
import PollResultsTabs from "@/components/pages/PollResultsTabs";
import  LTRVersion  from "@/components/pages/cards";

interface Poll {
  id: number;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
}

interface Profile {
  gender: string | null;
  birthdate: string | null;
  occupation: string | null;
  location: string | null;
}

export default function HomePage() {
  const { isLoaded: clerkLoaded, isSignedIn, user } = useUser();
  const { isLoaded: authLoaded } = useAuth();

  const [polls, setPolls] = useState<Poll[]>([]);
  const [votedMap, setVotedMap] = useState<Record<number, boolean>>({});
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [voteModalPoll, setVoteModalPoll] = useState<number | null>(null);
  const [resultsPoll, setResultsPoll] = useState<number | null>(null);

  // 1) Fetch user profile από MySQL **και μετά** sync στο /api/users
  useEffect(() => {
    if (!clerkLoaded || !isSignedIn || !user?.id) return;

    setLoadingProfile(true);
    fetch(`/api/profile?clerkId=${user.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setProfile(json.data);

          // **Sync** Clerk user στο MySQL πίνακα
          fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clerkId: user.id }),
          }).catch((err) =>
            console.error("❌ Failed to sync user to MySQL:", err)
          );
        }
      })
      .catch(console.error)
      .finally(() => {
        setLoadingProfile(false);
      });
  }, [clerkLoaded, isSignedIn, user?.id]);

  // 2) Fetch filtered polls & vote status
  useEffect(() => {
    if (!clerkLoaded || !authLoaded || !isSignedIn || !user?.id) return;

    fetch("/api/elections/filtered")
      .then((res) => res.json())
      .then((data: unknown) => {
        const arr = Array.isArray(data) ? (data as Poll[]) : [];
        if (!Array.isArray(data)) {
          console.error("Expected array from /api/elections/filtered:", data);
        }
        setPolls(arr);
        arr.forEach((p) => {
          fetch(`/api/vote/status?electionId=${p.id}`)
            .then((r) => r.json())
            .then(({ hasVoted }) => {
              setVotedMap((m) => ({ ...m, [p.id]: hasVoted }));
            })
            .catch(() => {
              setVotedMap((m) => ({ ...m, [p.id]: false }));
            });
        });
      })
      .catch(console.error);
  }, [clerkLoaded, authLoaded, isSignedIn, user?.id]);

  if (!clerkLoaded || loadingProfile) {
    return <div className="p-8 text-center text-gray-500">Φόρτωση...</div>;
  }

  if (!isSignedIn || !user) {
    return (
      <main >
      <LTRVersion />
      </main>
    );
  }

  // Check profile completeness
  const requiredFields: (keyof Profile)[] = [
    "gender",
    "birthdate",
    "occupation",
    "location",
  ];
  const missing = requiredFields.filter((f) => !profile?.[f]);
  const isVerified = missing.length === 0;

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      {missing.length > 0 ? (
        <div className="mb-6 flex items-center rounded-lg border border-red-500 bg-red-50 p-4">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-sm text-red-800">
            Παρακαλώ συμπληρώστε: {missing.join(", ")} στο προφίλ σας.
          </span>
        </div>
      ) : (
        <div className="mb-6 flex items-center rounded-lg border border-green-500 bg-green-50 p-4">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-green-800">
            Εγγεγραμμένος χρήστης
          </span>
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">
          Σύνολο Ψηφοφοριών: {polls.length}
        </h2>
        {polls.length === 0 && (
          <p className="text-gray-500">Δεν υπάρχουν διαθέσιμες ψηφοφορίες.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((p) => {
            const hasVoted = votedMap[p.id] === true;
            const ended = isAfter(new Date(), new Date(p.dateRange.endDate));

            return (
              <Card key={p.id} className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Vote className="mr-2 h-6 w-6 text-indigo-600" />
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-2">{p.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Λήξη: {format(new Date(p.dateRange.endDate), "dd/MM/yyyy")}
                </p>

                {ended ? (
                  <Button
                    onClick={() => setResultsPoll(p.id)}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Δες Αποτελέσματα
                  </Button>
                ) : (
                  <Button
                    disabled={!isVerified || hasVoted}
                    onClick={() => setVoteModalPoll(p.id)}
                    className={
                      !isVerified || hasVoted
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }
                  >
                    {hasVoted
                      ? "Έχεις ήδη ψηφίσει"
                      : isVerified
                      ? "Ψήφισε"
                      : "Ολοκλήρωσε το προφίλ"}
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Vote Modal */}
      <VoteModal
        pollId={voteModalPoll?.toString() ?? ""}
        open={!!voteModalPoll}
        onOpenChange={(open) => {
          if (!open && voteModalPoll) {
            setVotedMap((m) => ({ ...m, [voteModalPoll]: true }));
          }
          if (!open) setVoteModalPoll(null);
        }}
      />

      {/* Results Panel */}
      {resultsPoll && (
        <PollResultsTabs
          pollId={resultsPoll.toString()}
          onClose={() => setResultsPoll(null)}
        />
      )}

    </main>
  
  );
}
