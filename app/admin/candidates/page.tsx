// app/admin/candidates/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Search, UserPlus, X } from "lucide-react";

interface User {
  id: number;
  fullName: string;
  email: string;
  occupation: string | null;
}

interface Election {
  id: string;
  title: string;
}

interface Candidate {
  // Εδώ βλέπουμε τα δεδομένα που επιστρέφει το /api/elections/[id]/candidates
  id: number;        // candidateId (PK του candidate table)
  name: string;
  email: string | null;
  occupation: string | null;
  numberOfVotes: number;
}

export default function CandidatesPage() {
  const { toast } = useToast();

  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  // 1) Φόρτωση όλων των εκλογών
  useEffect(() => {
    fetch("/api/elections")
      .then((r) => r.json())
      .then(setElections)
      .catch(() =>
        toast({
          title: "Σφάλμα",
          description: "Αποτυχία φόρτωσης ψηφοφοριών",
          variant: "destructive",
        })
      );
  }, [toast]);

  // 2) Φόρτωση όλων των χρηστών
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
          setFilteredUsers(data);
        } else {
          toast({
            title: "Σφάλμα",
            description: data.error || "Αποτυχία φόρτωσης χρηστών",
            variant: "destructive",
          });
        }
      })
      .catch(() =>
        toast({
          title: "Σφάλμα",
          description: "Αποτυχία φόρτωσης χρηστών",
          variant: "destructive",
        })
      );
  }, [toast]);

  // 3) Φόρτωση υποψηφίων (takepart) όταν αλλάζει η επιλογή ψηφοφορίας
  useEffect(() => {
    if (!selectedElection) {
      setCandidates([]);
      return;
    }

    fetch(`/api/elections/${selectedElection}/candidates`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setCandidates)
      .catch(() =>
        toast({
          title: "Σφάλμα",
          description: "Αποτυχία φόρτωσης υποψηφίων",
          variant: "destructive",
        })
      );
  }, [selectedElection, toast]);

  // 4) Φιλτράρισμα διαθέσιμων χρηστών: δεν είναι ήδη καλεσμένοι
  useEffect(() => {
    // οι userId που είναι ήδη υποψήφιοι:
    const invitedIds = new Set(candidates.map((c) => c.id));
    setFilteredUsers(
      users.filter((u) => !invitedIds.has(u.id)).filter((u) =>
        [u.fullName, u.email, u.occupation ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [candidates, search, users]);

  // 5) Handler αναζήτησης
  const onSearch = (q: string) => setSearch(q);

  // 6) Πρόσκληση νέου υποψήφιου
  const inviteUser = async (u: User) => {
    if (!selectedElection) {
      toast({ title: "Επιλέξτε ψηφοφορία πρώτα", variant: "destructive" });
      return;
    }
    try {
      // Log the request details for debugging
      console.log("POSTing to", `/api/elections/${selectedElection}/candidates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: u.id }),
      });
      // Χρησιμοποιούμε το σωστό endpoint για προσθήκη υποψηφίου
      const res = await fetch(
        `/api/elections/${selectedElection}/candidates`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: u.id }),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      // Επαναφόρτωση της λίστας υποψηφίων
      const updated = await fetch(
        `/api/elections/${selectedElection}/candidates`
      ).then((r) => r.json());
      setCandidates(updated);
      toast({ title: "Επιτυχία", description: "Υποψήφιος προστέθηκε" });
      setOpen(false);
    } catch {
      toast({
        title: "Σφάλμα",
        description: "Αποτυχία πρόσκλησης",
        variant: "destructive",
      });
    }
  };

  // 7) Διαγραφή υποψηφίου
  const removeCandidate = async (candidateId: number) => {
    if (!selectedElection) return;
    try {
      await fetch(
        `/api/elections/${selectedElection}/candidates/${candidateId}`,
        { method: "DELETE" }
      ).then((r) => {
        if (!r.ok) throw new Error();
      });
      // Επαναφόρτωση
      const updated = await fetch(
        `/api/elections/${selectedElection}/candidates`
      ).then((r) => r.json());
      setCandidates(updated);
      toast({ title: "Επιτυχία", description: "Υποψήφιος αφαιρέθηκε" });
    } catch {
      toast({
        title: "Σφάλμα",
        description: "Αποτυχία αφαίρεσης",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Διαχείριση Υποψηφίων</h1>

      {/* Επιλογή ψηφοφορίας */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Επιλογή Ψηφοφορίας</label>
        <select
          value={selectedElection}
          onChange={(e) => setSelectedElection(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="" disabled>
            -- Επιλέξτε --
          </option>
          {elections.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
      </div>

      {/* Λίστα Υποψηφίων */}
      <div>
        <h2 className="text-lg font-semibold">Υποψήφιοι</h2>
        {candidates.length === 0 ? (
          <p className="text-gray-500">Δεν υπάρχουν υποψήφιοι.</p>
        ) : (
          <div className="space-y-2">
            {candidates.map((c) => (
              <div
                key={c.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-gray-600">{c.email}</div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCandidate(c.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Πρόσκλησης */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Προσθήκη
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Προσθήκη Υποψηφίου</DialogTitle>
            <DialogDescription>
              Επίλεξε χρήστη για πρόσκληση
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Αναζήτηση Χρηστών
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Όνομα, email ή θέση..."
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="h-64 overflow-y-auto border rounded">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Όνομα</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Θέση</TableHead>
                    <TableHead className="text-right">Ενέργεια</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.fullName}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.occupation ?? "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => inviteUser(u)}
                        >
                          <UserPlus className="mr-1 h-4 w-4" /> Προσθήκη
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Άκυρο
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
