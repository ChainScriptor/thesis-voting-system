// app/page.tsx
"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Vote, BarChart } from "lucide-react";
import { format, isAfter } from "date-fns";
import VoteModal from "@/components/pages/VoteModal";
import PollResultsTabs from "@/components/pages/PollResultsTabs";
import LTRVersion from "@/components/pages/cards";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

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

  // Φόρτωση προφίλ
  const fetchProfile = async () => {
    if (!user?.id) return;
    setLoadingProfile(true);
    try {
      const res = await fetch(`/api/profile?clerkId=${user.id}`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setProfile(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProfile(false);
    }
  };

  // 1) Load profile once signed in
  useEffect(() => {
    if (!clerkLoaded || !isSignedIn || !user?.id) return;
    fetchProfile();
  }, [clerkLoaded, isSignedIn, user?.id]);

  // 2) Load only the polls user is eligible for
  useEffect(() => {
    if (!clerkLoaded || !authLoaded || !isSignedIn || !user?.id) return;

    fetch("/api/elections/filtered", { credentials: "include" })
      .then((r) => r.json())
      .then((arr: Poll[]) => {
        setPolls(arr);
        // fetch each vote status
        arr.forEach((p) =>
          fetch(`/api/vote/status?electionId=${p.id}`, {
            credentials: "include",
          })
            .then((r2) => r2.json())
            .then(({ hasVoted }) =>
              setVotedMap((m) => ({ ...m, [p.id]: hasVoted }))
            )
            .catch(() =>
              setVotedMap((m) => ({ ...m, [p.id]: false }))
            )
        );
      })
      .catch(console.error);
  }, [clerkLoaded, authLoaded, isSignedIn, user?.id]);

  // loading / unauthenticated / incomplete‐profile handling
  if (!clerkLoaded)
    return <div className="p-8 text-center text-gray-500">Φόρτωση...</div>;
  if (isSignedIn && loadingProfile)
    return <div className="p-8 text-center text-gray-500">Φόρτωση...</div>;
  if (!isSignedIn || !user) return <main><LTRVersion /></main>;

  const required: (keyof Profile)[] = [
    "gender",
    "birthdate",
    "occupation",
    "location",
  ];
  const missing = required.filter((f) => !profile?.[f]);
  if (missing.length > 0) {
    return (
      <main className="p-8 text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold mb-2">
          Συμπληρώστε τα στοιχεία σας
        </h2>
        <p>
          Παρακαλώ ολοκληρώστε τα ακόλουθα πεδία στο προφίλ σας:{" "}
          <strong>{missing.join(", ")}</strong>.
        </p>
      </main>
    );
  }

  // διαχωρισμός ενεργών / ολοκληρωμένων
  const now = new Date();
  const activePolls = polls.filter((p) =>
    isAfter(new Date(p.dateRange.endDate), now)
  );
  const finishedPolls = polls.filter((p) =>
    !isAfter(new Date(p.dateRange.endDate), now)
  );

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex items-center p-4 rounded-lg border border-green-500 bg-green-50">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <span className="text-sm font-medium text-green-800">
          Εγγεγραμμένος χρήστης
        </span>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="border-b">
          <TabsTrigger value="active" className="px-4 py-2">
            <Vote className="inline-block mr-1" />
            Ενεργές
          </TabsTrigger>
          <TabsTrigger value="results" className="px-4 py-2">
            <BarChart className="inline-block mr-1" />
            Ολοκληρωμένες
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <h2 className="text-xl font-bold">
            {activePolls.length} ενεργές ψηφοφορίες
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePolls.map((p) => {
              const hasVoted = votedMap[p.id];
              return (
                <Card key={p.id} className="p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Vote className="mr-2 text-indigo-600" />
                    {p.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{p.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Λήξη: {format(new Date(p.dateRange.endDate), "dd/MM/yyyy")}
                  </p>
                  <Button
                    disabled={hasVoted}
                    onClick={() => setVoteModalPoll(p.id)}
                    className={
                      hasVoted
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }
                  >
                    {hasVoted ? "Έχεις ήδη ψηφίσει" : "Ψήφισε τώρα"}
                  </Button>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <h2 className="text-xl font-bold">
            {finishedPolls.length} ολοκληρωμένες ψηφοφορίες
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finishedPolls.map((p) => (
              <Card key={p.id} className="p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <BarChart className="mr-2 text-blue-600" />
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-2">{p.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Λήξη: {format(new Date(p.dateRange.endDate), "dd/MM/yyyy")}
                </p>
                <Button
                  onClick={() => setResultsPoll(p.id)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Δες Αποτελέσματα
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Vote Modal */}
      <VoteModal
        pollId={voteModalPoll?.toString() || ""}
        open={!!voteModalPoll}
        onOpenChange={(open) => {
          // απλώς κλείσιμο → δεν σημαίνει ψήφισα
          if (!open) setVoteModalPoll(null);
        }}
        onVoteSuccess={() => {
          // μόνο εδώ σημαίνει “έχει ψηφίσει”
          if (voteModalPoll) {
            setVotedMap((m) => ({ ...m, [voteModalPoll]: true }));
          }
          setVoteModalPoll(null);
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
