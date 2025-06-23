"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import pollService from "@/services/pollService";
import { Poll } from "@/types/poll";

interface User {
  id: number;
  fullName: string;
  email: string;
  occupation: string | null;
  location: string | null;
  gender: string | null;
  avatarUrl?: string;
}

const candidateSchema = z.object({
  name: z.string().min(2, { message: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες" }),
  email: z.string().email({ message: "Παρακαλώ εισάγετε ένα έγκυρο email" }),
  position: z.string().optional(),
  imageUrl: z.string().url({ message: "Παρακαλώ εισάγετε ένα έγκυρο URL" }).optional().or(z.literal("")),
});

export default function PollCandidates() {
  const params = useParams();
  const pollId = typeof params.pollId === "string" ? params.pollId : Array.isArray(params.pollId) ? params.pollId[0] : "";
  const router = useRouter();
  const { toast } = useToast();

  const [allPolls, setAllPolls] = useState<Poll[]>([]);
  const [poll, setPoll] = useState<Poll | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invitationSent, setInvitationSent] = useState<Record<string, boolean>>({});

  const form = useForm<z.infer<typeof candidateSchema>>({
    resolver: zodResolver(candidateSchema),
    defaultValues: { name: "", email: "", position: "", imageUrl: "" },
  });

  // φόρτωση polls
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const pollsData = await pollService.getPolls();
        setAllPolls(pollsData);
        if (pollId) {
          const p = await pollService.getPoll(pollId);
          if (!p) {
            toast({ title: "Σφάλμα", description: "Η ψηφοφορία δεν βρέθηκε", variant: "destructive" });
            return router.push("/admin/polls");
          }
          setPoll(p);
        }
      } catch {
        toast({ title: "Σφάλμα", description: "Αποτυχία φόρτωσης ψηφοφοριών", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pollId, router, toast]);

  // φόρτωση χρηστών
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users");
        const data: User[] = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch {
        toast({ title: "Σφάλμα", description: "Αποτυχία φόρτωσης χρηστών", variant: "destructive" });
      }
    })();
  }, [toast]);

  // φιλτράρισμα
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q) {
      setFilteredUsers(users);
    } else {
      const lower = q.toLowerCase();
      setFilteredUsers(
        users.filter(u =>
          u.fullName.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower) ||
          (u.occupation ?? "").toLowerCase().includes(lower)
        )
      );
    }
  };

  // προσθήκη υπάρχοντος χρήστη
  const handleAddExistingUser = (u: User) => {
    if (!pollId || !poll) return;
    form.setValue("name", u.fullName);
    form.setValue("email", u.email);
    form.setValue("position", u.occupation ?? "");
    form.setValue("imageUrl", "");
    onSubmit({ name: u.fullName, email: u.email, position: u.occupation, imageUrl: "" });
  };

  // υποβολή υποψηφίου
  const onSubmit = async (data: z.infer<typeof candidateSchema>) => {
    if (!pollId || !poll) return;
    try {
      const newC = await pollService.addCandidate(pollId, {
        name: data.name,
        email: data.email,
        position: data.position || undefined,
        imageUrl: data.imageUrl || undefined,
      });
      setPoll({ ...poll, candidates: [...poll.candidates, newC] });
      toast({ title: "Επιτυχία", description: "Υποψήφιος προστέθηκε" });
      form.reset();
      setIsDialogOpen(false);
    } catch {
      toast({ title: "Σφάλμα", description: "Αποτυχία προσθήκης", variant: "destructive" });
    }
  };

  // διαγραφή υποψηφίου
  const handleRemoveCandidate = async (cid: string) => {
    if (!pollId || !poll || !confirm("Είστε σίγουροι;")) return;
    try {
      await pollService.removeCandidate(pollId, cid);
      setPoll({ ...poll, candidates: poll.candidates.filter(c => c.id !== cid) });
      toast({ title: "Επιτυχία", description: "Υποψήφιος αφαιρέθηκε" });
    } catch {
      toast({ title: "Σφάλμα", description: "Αποτυχία αφαίρεσης", variant: "destructive" });
    }
  };

  // αποστολή πρόσκλησης
  const sendInvitation = (cid: string) => {
    setInvitationSent(prev => ({ ...prev, [cid]: true }));
    toast({ title: "Πρόσκληση", description: "Η πρόσκληση στάλθηκε" });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (!poll) {
    return (
      <DashboardLayout>
        <p className="text-center py-10">Δεν βρέθηκε η ψηφοφορία.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => router.push("/admin/polls")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Πίσω στις Ψηφοφορίες
          </Button>

          <select
            value={poll.id}
            onChange={e => router.push(`/admin/poll-candidates/${e.target.value}`)}
            className="border rounded px-3 py-2"
          >
            <option disabled value="">-- Επιλέξτε Ψηφοφορία --</option>
            {allPolls.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button><UserPlus className="mr-2 h-4 w-4" /> Προσθήκη Υποψηφίου</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Προσθήκη Υποψηφίου</DialogTitle>
                <DialogDescription>Εδώ μπορείτε να προσθέσετε νέο ή υπάρχον χρήστη.</DialogDescription>
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

                {/* Results Table */}
                <Table className="max-h-80 overflow-y-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Όνομα</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Θέση</TableHead>
                      <TableHead className="text-right">Ενέργεια</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(u => {
                        const avatar = u.avatarUrl
                          ? u.avatarUrl
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(u.fullName)}&background=random`;
                        return (
                          <TableRow key={u.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="relative h-8 w-8">
                                  <Image
                                    src={avatar}
                                    alt={u.fullName}
                                    fill
                                    className="rounded-full object-cover"
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                                <span>{u.fullName}</span>
                              </div>
                            </TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{u.occupation ?? "-"}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" onClick={() => handleAddExistingUser(u)}>
                                <UserPlus className="mr-1 h-4 w-4" /> Πρόσκληση
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                          Κανείς
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Or add manually */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField name="name" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Όνομα</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="email" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="position" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Θέση (προερ.)</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="imageUrl" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Εικόνα URL (προερ.)</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <DialogFooter className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Ακύρωση</Button>
                      <Button type="submit"><Plus className="mr-1 h-4 w-4" /> Δημιουργία</Button>
                    </DialogFooter>
                  </form>
                </Form>
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
                    <div className="relative w-full h-48">
                      <Image
                        src={c.imageUrl}
                        alt={c.name}
                        fill
                        className="object-cover"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
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
                  <CardDescription>{c.position}</CardDescription>
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
    </DashboardLayout>
  );
}
