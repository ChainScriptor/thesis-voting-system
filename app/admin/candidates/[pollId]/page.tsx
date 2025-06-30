// app/admin/candidates/[pollId]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import pollService from "@/services/pollService";
import type { Poll} from "@/types/poll";
import {
  ArrowLeft,
  Plus,
  User as UserIcon,
  UserPlus,
  X,
  Search,
  Mail,
  CheckCircle,

} from "lucide-react";

// Αν έχεις types στο "@/types/poll", προτίμησε να τα importάρεις:
// import { Poll, Candidate } from "@/types/poll";

interface PageUser {
  id: number;
  fullName: string;
  email: string;
  occupation: string | null;
  avatarUrl?: string;
}

const candidateSchema = z.object({
  name: z.string().min(2, { message: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες" }),
  email: z.string().email({ message: "Έγκυρο email" }),
  position: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export default function PollCandidates() {
  const router = useRouter();
  const { pollId } = useParams() as { pollId: string };
  const { toast } = useToast();

  const [poll, setPoll] = useState<Poll | null>(null);
  const [users, setUsers] = useState<PageUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<PageUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invitationSent, setInvitationSent] = useState<Record<number, boolean>>({});

  const form = useForm<z.infer<typeof candidateSchema>>({
    resolver: zodResolver(candidateSchema),
    defaultValues: { name: "", email: "", position: "", imageUrl: "" },
  });

  // 1) Φόρτωση της poll
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const p = await pollService.getPoll(pollId);
        if (!p) {
          toast({ title: "Σφάλμα", description: "Δεν βρέθηκε η ψηφοφορία", variant: "destructive" });
          router.push("/admin/candidates");
          return;
        }
        setPoll(p);
      } catch {
        toast({ title: "Σφάλμα", description: "Αποτυχία φόρτωσης", variant: "destructive" });
        router.push("/admin/candidates");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pollId, router, toast]);

  // 2) Φόρτωση χρηστών
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users");
        const data: PageUser[] = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch {
        toast({ title: "Σφάλμα", description: "Αποτυχία φόρτωσης χρηστών", variant: "destructive" });
      }
    })();
  }, [toast]);

  // 3) Φιλτράρισμα χρηστών
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q) {
      setFilteredUsers(users);
      return;
    }
    const lower = q.toLowerCase();
    setFilteredUsers(
      users.filter(u =>
        u.fullName.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower) ||
        (u.occupation ?? "").toLowerCase().includes(lower)
      )
    );
  };

  // 4) Προσθήκη υπάρχοντος χρήστη
  const handleAddExistingUser = (u: PageUser) => {
    // Γεμίζουμε τη φόρμα
    form.setValue("name", u.fullName);
    form.setValue("email", u.email);
    form.setValue("position", u.occupation ?? "");
    form.setValue("imageUrl", "");
    // Καλούμε απευθείας submit
    onSubmit({
      name: u.fullName,
      email: u.email,
      position: u.occupation ?? undefined,
      imageUrl: "",
    });
  };

  // 5) Υποβολή νέου υποψηφίου
   // 5) Υποβολή νέου υποψηφίου
   const onSubmit = async (data: z.infer<typeof candidateSchema>) => {
    if (!poll) return;
    try {
      // Αφαιρέθηκε η περιττή λογική τύπων
      const newC = await pollService.addCandidate(pollId, data);

      setPoll({
        ...poll,
        candidates: [...poll.candidates, newC],
      });
      toast({ title: "Επιτυχία", description: "Υποψήφιος προστέθηκε" });
      form.reset();
      setIsDialogOpen(false);
    } catch {
      toast({ title: "Σφάλμα", description: "Αποτυχία προσθήκης", variant: "destructive" });
    }
  };

  // 6) Διαγραφή υποψηφίου
  const handleRemoveCandidate = async (cid: number) => {
    if (!poll || !confirm("Είστε σίγουροι;")) return;
    try {
      await pollService.removeCandidate(pollId, cid);
      setPoll({
        ...poll,
        candidates: poll.candidates.filter(c => c.id !== cid),
      });
      toast({ title: "Επιτυχία", description: "Υποψήφιος αφαιρέθηκε" });
    } catch {
      toast({ title: "Σφάλμα", description: "Αποτυχία αφαίρεσης", variant: "destructive" });
    }
  };

  // 7) Αποστολή πρόσκλησης
  const sendInvitation = (cid: number) => {
    setInvitationSent(prev => ({ ...prev, [cid]: true }));
    toast({ title: "Πρόσκληση", description: "Η πρόσκληση στάλθηκε" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500" />
      </div>
    );
  }
  if (!poll) {
    return <p className="text-center py-10">Δεν βρέθηκε η ψηφοφορία.</p>;
  }

  return (
    <div className="space-y-6 p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push("/admin/candidates")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Πίσω στις Ψηφοφορίες
        </Button>
        <h1 className="text-xl font-semibold">{poll.title}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Προσθήκη Υποψηφίου
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Προσθήκη Υποψηφίου</DialogTitle>
              <DialogDescription>
                Εδώ μπορείτε να προσθέσετε νέο ή υπάρχον χρήστη.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block mb-1">Αναζήτηση Χρηστών</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9"
                    placeholder="Όνομα, email ή θέση..."
                    value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Results */}
              <Table className="max-h-80 overflow-y-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Όνομα</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Ενέργεια</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>{u.fullName}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleAddExistingUser(u)}
                        >
                          <UserPlus className="mr-1 h-4 w-4" /> Προσθήκη
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Or manually */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <Input placeholder="Όνομα" {...form.register("name")} />
                <Input placeholder="Email" {...form.register("email")} />
                <Input placeholder="Θέση (προερ.)" {...form.register("position")} />
                <Input placeholder="URL Εικόνας" {...form.register("imageUrl")} />
                <DialogFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Ακύρωση
                  </Button>
                  <Button type="submit">
                    <Plus className="mr-1 h-4 w-4" /> Δημιουργία
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* EXISTING CANDIDATES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poll.candidates.length === 0 ? (
          <Card className="p-8 text-center">
            <UserIcon className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-4 text-gray-500">Δεν υπάρχουν υποψήφιοι</p>
          </Card>
        ) : (
          poll.candidates.map(c => (
            <Card key={c.id} className="overflow-hidden">
              <div className="relative">
                {c.imageUrl ? (
                  <Image
                    src={c.imageUrl}
                    alt={c.name}
                    width={400} // ή προσαρμόσιμο
                    height={192} // περίπου 16:9 για h-48 (48 * 4 = 192px)
                    className="w-full h-48 object-cover"
                    style={{ objectFit: "cover" }}
                  />

                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <UserIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 rounded-full p-1"
                  onClick={() => handleRemoveCandidate(c.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{c.email}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => sendInvitation(c.id)}
                  disabled={!!invitationSent[c.id]}
                >
                  {invitationSent[c.id] ? (
                    <>
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" /> Εστάλη
                    </>
                  ) : (
                    <>
                      <Mail className="mr-1 h-4 w-4" /> Πρόσκληση
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
