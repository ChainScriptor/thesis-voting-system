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
        ) : (
          election.takepart.map((tp) => (
            <li key={tp.user.id} className="border rounded p-4 bg-white dark:bg-gray-900 flex justify-between items-center">
              <div>
                <div className="font-semibold">{tp.user.fullName}</div>
                <div className="text-gray-500 text-sm">{tp.user.email}</div>
                <div className="text-gray-400 text-xs">{tp.user.occupation}</div>
              </div>
              <div className="text-xl font-bold text-blue-600">{tp.numberOfVotes} ψήφοι</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}