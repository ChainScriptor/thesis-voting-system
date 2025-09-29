"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, PlusCircle, Trash2, Search, UserPlus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import occupationsData from "@/data/occupations.json";
import citiesData from "@/data/greekCities.json";

const pollSchema = z.object({
  title: z.string().min(5, "Ο τίτλος πρέπει να έχει τουλάχιστον 5 χαρακτήρες."),
  description: z.string().optional(),
  voting_type: z.enum(["public", "private", "invitation_only", "restricted"]).default("public"),
  access_code: z.string().optional(),
  dateRange: z.object({
    from: z.date({ required_error: "Η ημερομηνία έναρξης είναι υποχρεωτική." }),
    to: z.date({ required_error: "Η ημερομηνία λήξης είναι υποχρεωτική." }),
  }),
  target_occupation: z.string().optional(),
  target_location: z.string().optional(),
  birthdate_min: z.date().optional(),
  birthdate_max: z.date().optional(),
  target_gender: z.string().optional(),
  candidate_type: z.enum(["users", "text"]).default("users"),
  candidateIds: z.array(z.number()).optional(),
  textOptions: z.array(z.string()).optional(),
}).refine((data) => {
  if (data.candidate_type === "users") {
    return data.candidateIds && data.candidateIds.length >= 2;
  } else {
    return data.textOptions && data.textOptions.length >= 2;
  }
}, {
  message: "Πρέπει να υπάρχουν τουλάχιστον 2 επιλογές",
  path: ["candidateIds", "textOptions"]
});

type PollFormValues = z.infer<typeof pollSchema>;

interface User {
  id: number;
  fullName: string;
  email: string;
  occupation: string | null;
}

export default function CreatePollPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<User[]>([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [textOptions, setTextOptions] = useState<string[]>([]);
  const [selectedInvitedUsers, setSelectedInvitedUsers] = useState<User[]>([]);
  const [openInvitedDialog, setOpenInvitedDialog] = useState(false);

  const form = useForm<PollFormValues>({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      title: "",
      description: "",
      voting_type: "public",
      access_code: "",
      target_occupation: "",
      target_location: "",
      target_gender: "",
      candidate_type: "users",
      candidateIds: [],
      textOptions: [],
    },
  });

  // Φόρτωση χρηστών
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
          setFilteredUsers(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast({
          title: "Σφάλμα",
          description: "Αποτυχία φόρτωσης χρηστών",
          variant: "destructive",
        });
      });
  }, [toast]);

  // Φιλτράρισμα χρηστών
  useEffect(() => {
    const selectedIds = new Set(selectedCandidates.map((c) => c.id));
    setFilteredUsers(
      users.filter((u) => !selectedIds.has(u.id)).filter((u) =>
        [u.fullName, u.email, u.occupation ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [selectedCandidates, search, users]);

  const addCandidate = (user: User) => {
    setSelectedCandidates([...selectedCandidates, user]);
    form.setValue("candidateIds", [...selectedCandidates, user].map(u => u.id));
    setOpenUserDialog(false);
    setSearch("");
  };

  const removeCandidate = (userId: number) => {
    const updated = selectedCandidates.filter(u => u.id !== userId);
    setSelectedCandidates(updated);
    form.setValue("candidateIds", updated.map(u => u.id));
  };

  const addTextOption = () => {
    const newOptions = [...textOptions, ""];
    setTextOptions(newOptions);
    form.setValue("textOptions", newOptions);
  };

  // Αρχικοποίηση με 2 κενά πεδία
  useEffect(() => {
    if (textOptions.length === 0) {
      const initialOptions = ["", ""];
      setTextOptions(initialOptions);
      form.setValue("textOptions", initialOptions);
    }
  }, [form, textOptions.length]);

  const removeTextOption = (index: number) => {
    const newOptions = textOptions.filter((_, i) => i !== index);
    setTextOptions(newOptions);
    form.setValue("textOptions", newOptions);
  };

  const updateTextOption = (index: number, value: string) => {
    const newOptions = [...textOptions];
    newOptions[index] = value;
    setTextOptions(newOptions);
    form.setValue("textOptions", newOptions);
  };

  // Functions για προσκεκλημένους χρήστες
  const addInvitedUser = (user: User) => {
    if (!selectedInvitedUsers.find(u => u.id === user.id)) {
      setSelectedInvitedUsers([...selectedInvitedUsers, user]);
    }
  };

  const removeInvitedUser = (userId: number) => {
    setSelectedInvitedUsers(selectedInvitedUsers.filter(u => u.id !== userId));
  };

  async function onSubmit(data: PollFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/elections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          voting_type: data.voting_type,
          access_code: data.access_code || null,
          startDate: data.dateRange.from.toISOString(),
          endDate: data.dateRange.to.toISOString(),
          target_occupation: data.target_occupation || null,
          target_location: data.target_location || null,
          target_gender: data.target_gender || null,
          birthdate_min: data.birthdate_min?.toISOString() || null,
          birthdate_max: data.birthdate_max?.toISOString() || null,
          candidate_type: data.candidate_type,
          candidateIds: data.candidateIds || [],
          textOptions: data.textOptions || [],
          invitedUserIds: data.voting_type === "invitation_only" ? selectedInvitedUsers.map(u => u.id) : [],
        }),
      });

      if (!response.ok) {
        throw new Error('Η δημιουργία της ψηφοφορίας απέτυχε.');
      }

      toast({
        title: "Επιτυχία!",
        description: "Η ψηφοφορία δημιουργήθηκε.",
      });
      router.push("/admin/my-polls");

    } catch (error) {
      const err = error instanceof Error ? error.message : "Άγνωστο σφάλμα";
      toast({
        title: "Σφάλμα",
        description: err,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Δημιουργία Νέας Ψηφοφορίας</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Τίτλος</FormLabel>
                <FormControl>
                  <Input placeholder="π.χ. Εκλογή Προέδρου Συλλόγου" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Περιγραφή (Προαιρετικά)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Δώστε μερικές λεπτομέρειες για τη ψηφοφορία..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voting_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Τύπος Ψηφοφορίας</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="public">🌐 Δημόσια - Όλοι μπορούν να ψηφίσουν</option>
                    <option value="private">🔒 Ιδιωτική - Με κωδικό πρόσβασης</option>
                    <option value="invitation_only">📧 Προσκεκλημένοι - Μόνο ειδικά προσκεκλημένοι</option>
                    <option value="restricted">🎯 Περιορισμένη - Με targeting criteria</option>
                  </select>
                </FormControl>
                <FormMessage />
                <p className="text-sm text-gray-600">
                  {field.value === "public" && "Όλοι οι εγγεγραμμένοι χρήστες μπορούν να ψηφίσουν."}
                  {field.value === "private" && "Απαιτείται κωδικός πρόσβασης για συμμετοχή."}
                  {field.value === "invitation_only" && "Μόνο προσκεκλημένοι χρήστες μπορούν να ψηφίσουν."}
                  {field.value === "restricted" && "Ψηφοφορία με περιορισμούς (ηλικία, επάγγελμα, κλπ)."}
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="access_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Κωδικός Πρόσβασης</FormLabel>
                <FormControl>
                  <Input
                    placeholder="π.χ. VOTE2025"
                    {...field}
                    disabled={form.watch("voting_type") !== "private"}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-gray-600">
                  {form.watch("voting_type") === "private"
                    ? "Απαιτείται για ιδιωτικές ψηφοφορίες."
                    : "Διαθέσιμο μόνο για ιδιωτικές ψηφοφορίες."
                  }
                </p>
              </FormItem>
            )}
          />

          {/* Επιλογή προσκεκλημένων χρηστών - μόνο για invitation_only */}
          {form.watch("voting_type") === "invitation_only" && (
            <FormItem>
              <FormLabel>Προσκεκλημένοι Χρήστες</FormLabel>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Επιλέξτε τους χρήστες που θα μπορούν να συμμετάσχουν στην ψηφοφορία.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenInvitedDialog(true)}
                  >
                    + Προσθήκη Χρηστών
                  </Button>
                </div>

                {selectedInvitedUsers.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Επιλεγμένοι χρήστες ({selectedInvitedUsers.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedInvitedUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                        >
                          <span className="text-sm font-medium">{user.fullName}</span>
                          <span className="text-xs text-gray-500">({user.email})</span>
                          <button
                            type="button"
                            onClick={() => removeInvitedUser(user.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedInvitedUsers.length === 0 && (
                  <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm">Δεν έχουν επιλεγεί χρήστες ακόμα</p>
                    <p className="text-xs">Πατήστε "Προσθήκη Χρηστών" για να επιλέξετε</p>
                  </div>
                )}
              </div>
            </FormItem>
          )}

          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ημερομηνίες Διεξαγωγής</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field.value?.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Επιλέξτε εύρος</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={{ from: field.value?.from, to: field.value?.to }}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Δημογραφικά Στοιχεία - Εμφανίζονται μόνο για περιορισμένες ψηφοφορίες */}
          {form.watch("voting_type") === "restricted" && (
            <div className="space-y-4 p-4 border border-purple-200 bg-purple-50 rounded-lg">
              <h3 className="text-sm font-medium text-purple-800 mb-4">
                🎯 Κριτήρια Στόχευσης
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="target_occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Επάγγελμα Στόχευσης</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">-- Επιλέξτε Επάγγελμα --</option>
                          {occupationsData.map((occupation) => (
                            <option key={occupation.value} value={occupation.value}>
                              {occupation.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="target_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Τοποθεσία Στόχευσης</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">-- Επιλέξτε Τοποθεσία --</option>
                          {citiesData.map((city) => (
                            <option key={city.value} value={city.value}>
                              {city.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="birthdate_min"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ελάχιστη Ηλικία</FormLabel>
                      <div className="space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Ελάχιστη ημερομηνία γέννησης</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              fromYear={1950}
                              toYear={new Date().getFullYear()}
                              captionLayout="dropdown-buttons"
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">ή εισάγετε ηλικία:</span>
                          <Input
                            type="number"
                            placeholder="π.χ. 18"
                            min="0"
                            max="100"
                            className="w-20"
                            onChange={(e) => {
                              const age = parseInt(e.target.value);
                              if (age && age > 0) {
                                const birthYear = new Date().getFullYear() - age;
                                field.onChange(new Date(birthYear, 0, 1));
                              }
                            }}
                          />
                          <span className="text-sm text-gray-500">έτη</span>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthdate_max"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Μέγιστη Ηλικία</FormLabel>
                      <div className="space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Μέγιστη ημερομηνία γέννησης</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              fromYear={1950}
                              toYear={new Date().getFullYear()}
                              captionLayout="dropdown-buttons"
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">ή εισάγετε ηλικία:</span>
                          <Input
                            type="number"
                            placeholder="π.χ. 65"
                            min="0"
                            max="100"
                            className="w-20"
                            onChange={(e) => {
                              const age = parseInt(e.target.value);
                              if (age && age > 0) {
                                const birthYear = new Date().getFullYear() - age;
                                field.onChange(new Date(birthYear, 11, 31));
                              }
                            }}
                          />
                          <span className="text-sm text-gray-500">έτη</span>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="target_gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Φύλο</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">-- Επιλέξτε Φύλο --</option>
                        <option value="male">Άνδρας</option>
                        <option value="female">Γυναίκα</option>
                        <option value="other">Άλλο</option>
                        <option value="all">Όλα</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div>
            <FormLabel>Επιλογές Ψηφοφορίας</FormLabel>
            <p className="text-sm text-gray-600 mb-4">
              Επιλέξτε αν θέλετε να προσθέσετε χρήστες του συστήματος ως υποψηφίους ή απλά επιλογές με κείμενο.
            </p>

            {/* Toggle για τύπο επιλογών */}
            <FormField
              control={form.control}
              name="candidate_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Τύπος Επιλογών</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="users"
                          checked={field.value === "users"}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setSelectedCandidates([]);
                            setTextOptions([]);
                            form.setValue("candidateIds", []);
                            form.setValue("textOptions", []);
                          }}
                          className="text-blue-600"
                        />
                        <span>👥 Χρήστες Συστήματος</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="text"
                          checked={field.value === "text"}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setSelectedCandidates([]);
                            setTextOptions([]);
                            form.setValue("candidateIds", []);
                            form.setValue("textOptions", []);
                          }}
                          className="text-blue-600"
                        />
                        <span>📝 Επιλογές με Κείμενο</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Επιλογή Χρηστών */}
            {form.watch("candidate_type") === "users" && (
              <div className="space-y-4">
                {/* Επιλεγμένοι Υποψήφιοι */}
                {selectedCandidates.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Επιλεγμένοι Υποψήφιοι:</h4>
                    <div className="space-y-2">
                      {selectedCandidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className="flex justify-between items-center border p-3 rounded-lg bg-gray-50"
                        >
                          <div>
                            <div className="font-medium">{candidate.fullName}</div>
                            <div className="text-sm text-gray-600">{candidate.email}</div>
                            {candidate.occupation && (
                              <div className="text-sm text-gray-500">{candidate.occupation}</div>
                            )}
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeCandidate(candidate.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dialog για προσθήκη υποψηφίων */}
                <Dialog open={openUserDialog} onOpenChange={setOpenUserDialog}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Προσθήκη Υποψηφίου
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Επιλογή Υποψηφίου</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Αναζήτηση Χρηστών
                        </label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            className="pl-10"
                            placeholder="Όνομα, email ή επάγγελμα..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="h-64 overflow-y-auto border rounded">
                        {filteredUsers.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            Δεν βρέθηκαν χρήστες
                          </div>
                        ) : (
                          <div className="space-y-2 p-2">
                            {filteredUsers.map((user) => (
                              <div
                                key={user.id}
                                className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
                              >
                                <div>
                                  <div className="font-medium">{user.fullName}</div>
                                  <div className="text-sm text-gray-600">{user.email}</div>
                                  {user.occupation && (
                                    <div className="text-sm text-gray-500">{user.occupation}</div>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addCandidate(user)}
                                >
                                  <UserPlus className="mr-1 h-4 w-4" />
                                  Προσθήκη
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Dialog για επιλογή προσκεκλημένων χρηστών */}
                <Dialog open={openInvitedDialog} onOpenChange={setOpenInvitedDialog}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Επιλογή Προσκεκλημένων Χρηστών</DialogTitle>
                      <DialogDescription>
                        Επιλέξτε τους χρήστες που θα μπορούν να συμμετάσχουν στην ψηφοφορία.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Αναζήτηση Χρηστών
                        </label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            className="pl-10"
                            placeholder="Όνομα, email ή επάγγελμα..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="h-64 overflow-y-auto border rounded">
                        {filteredUsers.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            Δεν βρέθηκαν χρήστες
                          </div>
                        ) : (
                          <div className="space-y-2 p-2">
                            {filteredUsers.map((user) => {
                              const isAlreadyInvited = selectedInvitedUsers.find(u => u.id === user.id);
                              return (
                                <div
                                  key={user.id}
                                  className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
                                >
                                  <div>
                                    <div className="font-medium">{user.fullName}</div>
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                    {user.occupation && (
                                      <div className="text-sm text-gray-500">{user.occupation}</div>
                                    )}
                                  </div>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={isAlreadyInvited ? "secondary" : "default"}
                                    disabled={isAlreadyInvited}
                                    onClick={() => addInvitedUser(user)}
                                  >
                                    {isAlreadyInvited ? "Επιλεγμένος" : "Προσθήκη"}
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Επιλογή Text Options */}
            {form.watch("candidate_type") === "text" && (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Προσθέστε τουλάχιστον 2 επιλογές. Μπορείτε να διαγράψετε πεδία αν έχετε περισσότερα από 2.
                </div>
                <div className="space-y-3">
                  {textOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Input
                          value={option}
                          onChange={(e) => updateTextOption(index, e.target.value)}
                          placeholder={`Επιλογή #${index + 1} (π.χ. Ναι, Όχι, Αποχή)`}
                          className="text-base"
                        />
                      </div>
                      {textOptions.length > 2 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeTextOption(index)}
                          className="shrink-0"
                          title="Διαγραφή επιλογής"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTextOption}
                  className="w-full"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Προσθήκη Επιλογής
                </Button>
              </div>
            )}

            <FormMessage />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Αποθήκευση..." : "Δημιουργία Ψηφοφορίας"}
          </Button>
        </form>
      </Form>
    </div>
  );
}