"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Plus, Users, Trash2 } from "lucide-react";

import cities from "@/data/greekCities.json";
import occupations from "@/data/occupations.json";

interface Poll {
  id: string;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
  targeting: { roles: string[]; locations: string[] };
  candidates: { id: number; name: string }[];
  createdAt: string;
  isActive?: boolean;
  createdByCurrentUser?: boolean; // ✅ προστέθηκε
}

export default function AdminPollsPage() {
  const router = useRouter();

  const [polls, setPolls] = useState<Poll[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    target_occupation: "",
    target_location: "",
    birthdate_min: "",
    birthdate_max: "",
    target_gender: "",
  });
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
  fetch("/api/elections/my")  
    .then((r) => r.json())
    .then((data: Poll[]) => setPolls(data))
    .catch(console.error);
}, []);


  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/elections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          startDate: form.start_date,
          endDate: form.end_date,
          targetOccupation: form.target_occupation,
          targetLocation: form.target_location,
          birthdateMin: form.birthdate_min,
          birthdateMax: form.birthdate_max,
          targetGender: form.target_gender,
          is_active: true,
        }),
      });
      if (!res.ok) throw new Error();

      const r2 = await fetch("/api/elections/my");
      const data: Poll[] = await r2.json();
      setPolls(data);
      setForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        target_occupation: "",
        target_location: "",
        birthdate_min: "",
        birthdate_max: "",
        target_gender: "",
      });
      setIsDialogOpen(false);
    } catch {
      alert("Σφάλμα κατά τη δημιουργία ψηφοφορίας.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την ψηφοφορία;"))
      return;
    try {
      const res = await fetch(`/api/elections/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPolls((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Αποτυχία διαγραφής ψηφοφορίας.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ψηφοφορίες</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Δημιουργία Ψηφοφορίας
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Δημιουργία Νέας Ψηφοφορίας</DialogTitle>
              <DialogDescription>
                Συμπλήρωσε τα πεδία και πάτησε “Δημιουργία Ψηφοφορίας”
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Τίτλος</label>
                <Input name="title" value={form.title} onChange={onChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Περιγραφή</label>
                <Textarea name="description" value={form.description} onChange={onChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Έναρξη</label>
                  <Input type="date" name="start_date" value={form.start_date} onChange={onChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Λήξη</label>
                  <Input type="date" name="end_date" value={form.end_date} onChange={onChange} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Επάγγελμα Στόχευσης</label>
                <select name="target_occupation" value={form.target_occupation} onChange={onChange} className="w-full border rounded px-3 py-2">
                  <option value="" disabled>-- Επιλέξτε Επάγγελμα --</option>
                  {occupations.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Τοποθεσία Στόχευσης</label>
                <select name="target_location" value={form.target_location} onChange={onChange} className="w-full border rounded px-3 py-2">
                  <option value="" disabled>-- Επιλέξτε Τοποθεσία --</option>
                  {cities.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Ελάχιστη Ηλικία</label>
                  <Input type="date" name="birthdate_min" value={form.birthdate_min} onChange={onChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Μέγιστη Ηλικία</label>
                  <Input type="date" name="birthdate_max" value={form.birthdate_max} onChange={onChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Φύλο</label>
                <select
                  name="target_gender"
                  value={form.target_gender}
                  onChange={onChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>
                    -- Επιλέξτε Φύλο --
                  </option>
                  <option value="male">Άνδρας</option>
                  <option value="female">Γυναίκα</option>
                  <option value="other">Άλλο</option>
                </select>
              </div>

              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Άκυρο
                </Button>
                <Button type="submit" disabled={creating}>
                  {creating ? "Δημιουργία..." : "Δημιουργία Ψηφοφορίας"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

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
                <div className="text-sm text-gray-500 truncate max-w-[250px]">{poll.description}</div>
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
                {format(new Date(poll.dateRange.startDate), "MMM d, yyyy")} έως{" "}
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
              <TableCell>{format(new Date(poll.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                {poll.createdByCurrentUser && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/poll-candidates/${poll.id}`)}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(poll.id)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
