"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/seperator";
import { useUser } from "@clerk/nextjs";

import greekCities from "@/data/greekCities.json";
import occupations from "@/data/occupations.json";

const formSchema = z.object({
  gender: z.string().min(1, "Απαιτείται επιλογή φύλου"),
  birthdate: z.string().min(1, "Απαιτείται ημερομηνία"),
  occupation: z.string().min(1, "Απαιτείται επάγγελμα"),
  location: z.string().min(1, "Απαιτείται τοποθεσία"),
});

type FormValues = z.infer<typeof formSchema>;

// ✅ Επέκταση props για να δέχεται onSuccess
interface ProfileVerificationDialogProps {
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

const ProfileVerificationDialog = ({
  trigger,
  onSuccess,
}: ProfileVerificationDialogProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      birthdate: "",
      occupation: "",
      location: "",
    },
  });

  useEffect(() => {
    if (open && user?.id) {
      fetch(`/api/profile?clerkId=${user.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            const { gender, birthdate, occupation, location } = json.data;
            form.reset({
              gender,
              birthdate: birthdate.slice(0, 10),
              occupation,
              location,
            });
          }
        })
        .catch((err) => {
          console.error("Error loading profile data:", err);
        });
    }
  }, [open, user, form]);

  const onSubmit = async (data: FormValues) => {
    if (!user?.id) {
      toast({
        title: "Σφάλμα",
        description: "Δεν βρέθηκε χρήστης. Παρακαλώ συνδεθείτε.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idNumber: user.id, ...data }),
      });
      const result = await res.json();

      if (result.success) {
        setOpen(false);
        toast({
          title: "Επιτυχία",
          description: "Τα στοιχεία σας αποθηκεύτηκαν επιτυχώς.",
        });
        if (onSuccess) onSuccess(); // ✅ Εκτέλεση του callback
      } else {
        toast({
          title: "Αποτυχία",
          description: result.message || "Προέκυψε σφάλμα κατά την αποθήκευση.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Σφάλμα Δικτύου",
        description: "Απέτυχε η σύνδεση με τον διακομιστή.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>{trigger}</span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Επαλήθευση Προφίλ</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-sm text-muted-foreground"
          >
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Φύλο</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Επιλέξτε φύλο" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectItem value="male">Άνδρας</SelectItem>
                      <SelectItem value="female">Γυναίκα</SelectItem>
                      <SelectItem value="other">Άλλο</SelectItem>
                      <SelectItem value="prefer_not_to_say">Προτιμώ να μην πω</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ημερομηνία Γέννησης</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Επάγγελμα</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Επιλέξτε επάγγελμα" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {occupations.map((job) => (
                        <SelectItem value={job.value} key={job.value}>
                          {job.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Πόλη</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Επιλέξτε τοποθεσία" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {greekCities.map((city) => (
                        <SelectItem value={city.value} key={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-4 text-xs">
              <strong>Σημαντική σημείωση:</strong><br />
              Τα στοιχεία που παρέχετε χρησιμοποιούνται αποκλειστικά για την επαλήθευση της ταυτότητάς σας
              και την αποτροπή πολλαπλών ψήφων στις ψηφοφορίες.
            </div>

            <Separator className="my-4" />
            <DialogFooter>
              <Button type="submit" className="bg-black text-white">
                Υποβολή
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileVerificationDialog;
