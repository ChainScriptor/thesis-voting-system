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
import { useProfileSync } from "@/hooks/useProfileSync";
import { usePollsPolling } from "@/hooks/usePollsPolling";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// Helper function to translate voting types to Greek
const getVotingTypeLabels = (votingType: string): { icon: string; label: string; description: string } => {
  switch (votingType) {
    case 'public':
      return {
        icon: '🌐',
        label: 'Δημόσια',
        description: 'Όλοι μπορούν να ψηφίσουν'
      };
    case 'private':
      return {
        icon: '🔒',
        label: 'Ιδιωτική',
        description: 'Με κωδικό πρόσβασης'
      };
    case 'invitation_only':
      return {
        icon: '📧',
        label: 'Προσκεκλημένη',
        description: 'Μόνο ειδικά προσκεκλημένοι'
      };
    case 'restricted':
      return {
        icon: '🎯',
        label: 'Περιορισμένη',
        description: 'Με targeting criteria'
      };
    default:
      return {
        icon: '❓',
        label: 'Άγνωστος τύπος',
        description: 'Τύπος ψηφοφορίας άγνωστος'
      };
  }
};

interface Poll {
  id: number;
  title: string;
  description: string;
  voting_type?: string;
  access_code?: string | null;
  dateRange: { startDate: string; endDate: string };
  isActive?: boolean;
}

export default function HomePage() {
  const { isLoaded: clerkLoaded, isSignedIn, user } = useUser();
  const {
    profileData,
    isLoading: isProfileLoading,
    hasProfile,
    refresh: refreshProfile,
  } = useProfileSync();
  const { polls: pollingPolls, isLoading: isPollingLoading, lastUpdate } = usePollsPolling(3000); // Poll every 3 seconds

  const [polls, setPolls] = useState<Poll[]>([]); //λίστα ψηφοφοριών 
  const [votedMap, setVotedMap] = useState<Record<number, boolean>>({}); //αν έχει ψηφίσει ο χρήστης 
  const [voteModalPoll, setVoteModalPoll] = useState<number | null>(null); //id για το voting modal 
  const [resultsPoll, setResultsPoll] = useState<number | null>(null); //id για τα αποτελέσματα 

  // Update polls from polling hook
  useEffect(() => {
    if (pollingPolls.length > 0) {
      setPolls(pollingPolls);

      // Check vote status from database API για polls που δεν έχουμε ελέγξει ακόμα
      const pollsToCheck = pollingPolls.filter(p => !(p.id in votedMap));

      if (pollsToCheck.length > 0) {
        pollsToCheck.forEach((p) =>
          fetch(`/api/vote/status?electionId=${p.id}`, {
            credentials: "include",
          })
            .then((r2) => r2.json())
            .then(({ hasVoted }) =>
              setVotedMap((m) => ({ ...m, [p.id]: hasVoted }))
            )
            .catch(() => setVotedMap((m) => ({ ...m, [p.id]: false })))
        );
      }
    }
  }, [pollingPolls, votedMap]); // Include votedMap in dependencies

  // Remove unused handleVoteSuccess function

  if (!clerkLoaded)
    return <div className="p-8 text-center text-gray-500">Φόρτωση...</div>;
  if (isSignedIn && isProfileLoading)
    return <div className="p-8 text-center text-gray-500">Φόρτωση προφίλ...</div>;
  if (!isSignedIn || !user) return <main><LTRVersion /></main>;

  const now = new Date();
  const activePolls = polls.filter((p) =>
    isAfter(new Date(p.dateRange.endDate), now)
  );
  const finishedPolls = polls.filter((p) =>
    !isAfter(new Date(p.dateRange.endDate), now)
  );

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {!hasProfile ? (
        <div className="text-center p-4 border border-red-300 bg-red-50 rounded">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">
            Συμπληρώστε τα στοιχεία σας
          </h2>
          <p className="mb-4">
            Παρακαλώ ολοκληρώστε τα στοιχεία του προφίλ σας για να συμμετέχετε στις ψηφοφορίες.
          </p>
          <p className="text-sm text-gray-600">
            Χρήστης: {profileData?.email || user.emailAddresses[0]?.emailAddress}
          </p>
          <Button className="mt-4" onClick={refreshProfile}>Έλεγξε ξανά</Button>
        </div>
      ) : (
        <div className="flex items-center p-4 rounded-lg border border-green-500 bg-green-50">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-green-800">
            Εγγεγραμμένος χρήστης - {profileData?.fullName || user.fullName}
          </span>
        </div>
      )}

      {hasProfile && (
        <div className="space-y-4">
          {/* Auto-refresh indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isPollingLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isPollingLoading ? 'Ενημέρωση...' : 'Αυτόματη ενημέρωση κάθε 3 δευτερόλεπτα - Ψηφοφορίες που σας αφορούν'}
              </span>
              {lastUpdate && (
                <span className="text-xs text-gray-500">
                  (Τελευταία ενημέρωση: {lastUpdate.toLocaleTimeString()})
                </span>
              )}
            </div>
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
                  const votingTypeInfo = getVotingTypeLabels(p.voting_type || 'public');
                  return (
                    <Card key={p.id} className="p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold flex items-center flex-1">
                          <Vote className="mr-2 text-indigo-600" />
                          {p.title}
                        </h3>
                        <div className="flex items-center ml-2">
                          <span className="text-lg">{votingTypeInfo.icon}</span>
                          <span className="text-sm font-medium text-gray-600 ml-1">
                            {votingTypeInfo.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1 italic">
                        {votingTypeInfo.description}
                      </p>
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
                {finishedPolls.map((p) => {
                  const votingTypeInfo = getVotingTypeLabels(p.voting_type || 'public');
                  return (
                    <Card key={p.id} className="p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold flex items-center flex-1">
                          <BarChart className="mr-2 text-blue-600" />
                          {p.title}
                        </h3>
                        <div className="flex items-center ml-2">
                          <span className="text-lg">{votingTypeInfo.icon}</span>
                          <span className="text-sm font-medium text-gray-600 ml-1">
                            {votingTypeInfo.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1 italic">
                        {votingTypeInfo.description}
                      </p>
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
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {voteModalPoll !== null && (
        <VoteModal
          open={true}
          pollId={String(voteModalPoll)}
          onOpenChange={(open) => {
            if (!open) {
              setVoteModalPoll(null);
            }
          }}
          onVoteSuccess={() => {
            const justVotedId = voteModalPoll;
            setVoteModalPoll(null);
            if (!justVotedId) return;

            // Ενημέρωση του votedMap από τη βάση δεδομένων
            fetch(`/api/vote/status?electionId=${justVotedId}`, {
              credentials: "include",
            })
              .then((r) => r.json())
              .then(({ hasVoted }) =>
                setVotedMap((m) => ({ ...m, [justVotedId]: hasVoted }))
              )
              .catch(() =>
                setVotedMap((m) => ({ ...m, [justVotedId]: false }))
              );
          }}
        />
      )}

      {resultsPoll !== null && (
        <PollResultsTabs
          pollId={String(resultsPoll)}
          onClose={() => setResultsPoll(null)}
        />
      )}
    </main>
  );
}
