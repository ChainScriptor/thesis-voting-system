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
  id: number;
  poll_id: number;
  user_id: number;
  invited_at: string;
  fullName: string;
  email: string;
  occupation: string | null;
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

  // 1) Φόρτωση ψηφοφοριών
  useEffect(() => {
    fetch("/api/elections")
      .then((r) => r.json())
      .then(setElections)
      .catch(() =>
        toast({ title: "Σφάλμα", description: "Αποτυχία φόρτωσης ψηφοφοριών", variant: "destructive" })
      );
  }, [toast]);

  // 2) Φόρτωση χρηστών
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data: User[]) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(() =>
        toast({ title: "Σφάλμα", description: "Αποτυχία φόρτωσης χρηστών", variant: "destructive" })
      );
  }, [toast]);

  // 3) Φόρτωση υποψηφίων όταν αλλάζει επιλογή ψηφοφορίας
  useEffect(() => {
    if (!selectedElection) {
      setCandidates([]);
      return;
    }
    fetch(`/api/poll-candidates?pollId=${selectedElection}`)
      .then((r) => r.json())
      .then(setCandidates)
      .catch(() =>
        toast({ title: "Σφάλμα", description: "Αποτυχία φόρτωσης υποψηφίων", variant: "destructive" })
      );
  }, [selectedElection, toast]);

  // 4) Φιλτράρισμα διαθέσιμων χρηστών (όχι ήδη καλεσμένων) + αναζήτηση
  useEffect(() => {
    const invitedIds = new Set(candidates.map(c => c.user_id));
    setFilteredUsers(
      users
        .filter(u => !invitedIds.has(u.id))
        .filter(u =>
          u.fullName.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          (u.occupation ?? "").toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [candidates, search, users]);

  // 5) Χειριστής αναζήτησης
  const onSearch = (q: string) => {
    setSearch(q);
  };

  // 6) Πρόσκληση νέου υποψηφίου
  const inviteUser = async (u: User) => {
    if (!selectedElection) {
      toast({ title: "Επιλέξτε ψηφοφορία πρώτα", variant: "destructive" });
      return;
    }
    try {
      const res = await fetch("/api/poll-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: selectedElection, userId: u.id }),
      });
      if (!res.ok) throw new Error();
      const newCand: Candidate = await res.json();
      setCandidates(prev => [...prev, newCand]);
      toast({ title: "Επιτυχία", description: "Υποψήφιος προστέθηκε" });
      setOpen(false);
    } catch {
      toast({ title: "Σφάλμα", description: "Αποτυχία πρόσκλησης", variant: "destructive" });
    }
  };

  // 7) Διαγραφή υποψηφίου
  const removeCandidate = async (candidateId: number) => {
    if (!selectedElection) return;
    try {
      const res = await fetch(`/api/poll-candidates/${candidateId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCandidates(prev => prev.filter(c => c.id !== candidateId));
      toast({ title: "Επιτυχία", description: "Υποψήφιος αφαιρέθηκε" });
    } catch {
      toast({ title: "Σφάλμα", description: "Αποτυχία αφαίρεσης", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Διαχείριση Υποψηφίων</h1>

      {/* Επιλογή Ψηφοφορίας */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Επιλογή Ψηφοφορίας</label>
        <select
          value={selectedElection}
          onChange={e => setSelectedElection(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="" disabled>-- Επιλέξτε --</option>
          {elections.map(el => (
            <option key={el.id} value={el.id}>{el.title}</option>
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
            {candidates.map(c => (
              <div key={c.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <div className="font-medium">{c.fullName}</div>
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
          <Button><UserPlus className="mr-2 h-4 w-4" /> Προσθήκη</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Προσθήκη Υποψηφίου</DialogTitle>
            <DialogDescription>Επίλεξε χρήστη για πρόσκληση</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Αναζήτηση Χρηστών</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Όνομα, email ή θέση..."
                  value={search}
                  onChange={e => onSearch(e.target.value)}
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
                  {filteredUsers.map(u => (
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
