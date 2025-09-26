import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ElectionResultsPage({ params }: { params: { id: string } }) {
  const electionId = parseInt(params.id, 10);
  if (isNaN(electionId)) return notFound();

  const election = await prisma.election.findUnique({
    where: { id: electionId },
    include: {
      takepart: {
        include: { user: true },
        orderBy: { numberOfVotes: "desc" },
      },
    },
  });

  if (!election) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Αποτελέσματα Ψηφοφορίας</h1>
      <div className="mb-2 text-lg font-semibold">{election.title}</div>
      <div className="mb-6 text-gray-600 dark:text-gray-300">{election.description}</div>
      <ul className="space-y-4">
        {election.takepart.length === 0 ? (
          <li className="text-gray-500">Δεν υπάρχουν υποψήφιοι για αυτή τη ψηφοφορία.</li>
        ) : (() => {
          // Βρίσκουμε τον μέγιστο αριθμό ψήφων
          const maxVotes = Math.max(...election.takepart.map(tp => tp.numberOfVotes));
          // Βρίσκουμε πόσοι έχουν τον μέγιστο αριθμό ψήφων
          const winnersCount = election.takepart.filter(tp => tp.numberOfVotes === maxVotes).length;
          const isTie = winnersCount > 1;

          return election.takepart.map((tp, idx) => {
            const isWinner = tp.numberOfVotes === maxVotes;
            const isFirstWinner = isWinner && idx === election.takepart.findIndex(candidate => candidate.numberOfVotes === maxVotes);

            return (
              <li key={tp.user.id} className={`border rounded p-4 bg-white dark:bg-gray-900 flex justify-between items-center ${isWinner ? "border-green-500 bg-green-50 dark:bg-green-900" : ""
                }`}>
                <div>
                  <div className="font-semibold">
                    {isWinner && isFirstWinner ? (isTie ? "🤝 " : "🏆 ") : ""}
                    {tp.user.fullName}
                    {isWinner && isFirstWinner && isTie ? " (Ισσοπαλία)" : ""}
                  </div>
                  <div className="text-gray-500 text-sm">{tp.user.email}</div>
                  <div className="text-gray-400 text-xs">{tp.user.occupation}</div>
                </div>
                <div className={`text-xl font-bold ${isWinner ? "text-green-600" : "text-blue-600"}`}>
                  {tp.numberOfVotes} ψήφοι
                </div>
              </li>
            );
          });
        })()}
      </ul>
    </div>
  );
}