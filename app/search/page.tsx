import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query?.trim() || "";
  let elections = [];
  if (query) {
    elections = await prisma.election.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { start_date: "desc" },
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Αποτελέσματα Αναζήτησης</h1>
      {query ? (
        elections.length > 0 ? (
          <ul className="space-y-4">
            {elections.map((election) => (
              <li key={election.id} className="border rounded p-4 bg-white dark:bg-gray-900">
                <div className="font-semibold text-lg">{election.title}</div>
                <div className="text-gray-600 dark:text-gray-300">{election.description}</div>
                <div className="text-sm text-gray-400 mt-1">
                  Από {new Date(election.start_date).toLocaleDateString()} έως {new Date(election.end_date).toLocaleDateString()}
                </div>
                <a
                  href={`/elections/${election.id}/results`}
                  className="inline-block mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded font-semibold transition"
                >
                  Δες τα αποτελέσματα
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">Δεν βρέθηκαν ψηφοφορίες για το "{query}".</div>
        )
      ) : (
        <div className="text-gray-500">Πληκτρολόγησε λέξη-κλειδί για αναζήτηση ψηφοφορίας.</div>
      )}
    </div>
  );
}