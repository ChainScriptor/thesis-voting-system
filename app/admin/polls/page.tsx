// app/admin/polls/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Users, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Poll {
  id: string;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
  targeting: { roles: string[]; locations: string[] };
  candidates: { id: number; name: string }[];
  createdAt: string;
}

export default function PollsPage() {
  const router = useRouter();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPolls() {
      try {
        const res = await fetch("/api/elections");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data: Poll[] = await res.json();
        setPolls(data);
      } catch (err) {
        console.error("Failed to load polls:", err);
      }
    }
    fetchPolls();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την ψηφοφορία;"))
      return;
    setLoading(true);
    try {
      const res = await fetch(`/api/elections/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setPolls((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete poll error:", err);
      alert("Αποτυχία διαγραφής ψηφοφορίας.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ψηφοφορίες</h1>
        <Link href="/admin/create-poll">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Δημιουργία Ψηφοφορίας
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Τίτλος</TableHead>
            <TableHead>Κατάσταση</TableHead>
            <TableHead>Διάστημα</TableHead>
            <TableHead>Στόχευση</TableHead>
            <TableHead>Υποψήφιοι</TableHead>
            <TableHead>Δημιουργήθηκε</TableHead>
            <TableHead className="text-right">Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {polls.map((poll) => (
            <TableRow key={poll.id}>
              <TableCell>
                <div className="font-medium">{poll.title}</div>
                <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                  {poll.description}
                </div>
              </TableCell>
              <TableCell>
                {new Date() < new Date(poll.dateRange.startDate) ? (
                  <Badge variant="secondary">Προγραμματίστηκε</Badge>
                ) : new Date() > new Date(poll.dateRange.endDate) ? (
                  <Badge variant="outline">Τέλειωσε</Badge>
                ) : (
                  <Badge className="bg-green-500">Ενεργή</Badge>
                )}
              </TableCell>
              <TableCell>
                {format(
                  new Date(poll.dateRange.startDate),
                  "MMM d, yyyy"
                )}{" "}
                έως{" "}
                {format(new Date(poll.dateRange.endDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {poll.targeting.roles.length ? (
                  poll.targeting.roles.map((r) => (
                    <Badge key={r} variant="outline" className="mr-1">
                      {r}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline">All</Badge>
                )}
              </TableCell>
              <TableCell>{poll.candidates.length}</TableCell>
              <TableCell>
                {format(new Date(poll.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(`/admin/candidates/${poll.id}`)
                    }
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(`/admin/create-poll?edit=${poll.id}`)
                    }
                    className="text-blue-500 hover:bg-blue-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(poll.id)}
                    className="text-red-500 hover:bg-red-50"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
