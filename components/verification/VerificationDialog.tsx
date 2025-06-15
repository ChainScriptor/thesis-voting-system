"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/seperator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const basicProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες" }),
  lastName: z
    .string()
    .min(2, { message: "Το επώνυμο πρέπει να έχει τουλάχιστον 2 χαρακτήρες" }),
  email: z.string().email({ message: "Μη έγκυρη διεύθυνση email" }),
  phone: z
    .string()
    .min(10, { message: "Το τηλέφωνο πρέπει να έχει τουλάχιστον 10 ψηφία" })
    .optional(),
});

const demographicsSchema = z.object({
  gender: z.string().optional(),
  ageRange: z.string().optional(),
  occupation: z.string().optional(),
  education: z.string().optional(),
  location: z.string().optional(),
  maritalStatus: z.string().optional(),
  income: z.string().optional(),
});

interface VerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
}

const VerificationDialog = ({
  isOpen,
  onClose,
  isVerified,
  setIsVerified,
}: VerificationDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("verification");

  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      idNumber: "",
      taxId: "",
    },
  });

  const basicForm = useForm<z.infer<typeof basicProfileSchema>>({
    resolver: zodResolver(basicProfileSchema),
    defaultValues: {
      firstName: "Γιώργος",
      lastName: "Παπαδόπουλος",
      email: "gpapadopoulos@example.com",
      phone: "6912345678",
    },
  });

  const demographicsForm = useForm<z.infer<typeof demographicsSchema>>({
    resolver: zodResolver(demographicsSchema),
    defaultValues: {
      gender: "",
      ageRange: "",
      occupation: "",
      education: "",
      location: "",
      maritalStatus: "",
      income: "",
    },
  });

  const onVerificationSubmit = (values: z.infer<typeof verificationSchema>) => {
    console.log(values);
    setIsVerified(true);
    toast({
      title: "Αίτημα επαλήθευσης στάλθηκε",
      description: "Το αίτημα επαλήθευσης των στοιχείων σας υποβλήθηκε επιτυχώς.",
    });
    onClose();
  };

  const onBasicSubmit = (values: z.infer<typeof basicProfileSchema>) => {
    console.log(values);
    toast({
      title: "Επιτυχής ενημέρωση",
      description: "Τα βασικά στοιχεία του προφίλ σας ενημερώθηκαν επιτυχώς.",
    });
  };

  const onDemographicsSubmit = (values: z.infer<typeof demographicsSchema>) => {
    console.log(values);
    toast({
      title: "Επιτυχής ενημέρωση",
      description: "Τα δημογραφικά στοιχεία του προφίλ σας ενημερώθηκαν επιτυχώς.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Το προφίλ μου</DialogTitle>
        </DialogHeader>

        {isVerified && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-700">Τα στοιχεία σας έχουν επαληθευτεί</p>
              <p className="text-sm text-green-600">Μπορείτε να συμμετέχετε σε όλες τις ψηφοφορίες.</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="verification">Επαλήθευση</TabsTrigger>
            <TabsTrigger value="basic">Βασικά Στοιχεία</TabsTrigger>
            <TabsTrigger value="demographics">Δημογραφικά</TabsTrigger>
          </TabsList>

          <TabsContent value="verification">
            {!isVerified ? (
              <Form {...verificationForm}>
                <form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="space-y-4">
                  <FormField
                    control={verificationForm.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Αριθμός Ταυτότητας / Διαβατηρίου</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Εισάγετε τον αριθμό της αστυνομικής ταυτότητας ή του διαβατηρίου σας
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={verificationForm.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ΑΦΜ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Εισάγετε το Αριθμό Φορολογικού Μητρώου σας (ΑΦΜ)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700 text-sm">
                    <p className="font-medium">Σημαντική σημείωση:</p>
                    <p>
                      Τα στοιχεία που παρέχετε χρησιμοποιούνται αποκλειστικά για την επαλήθευση της ταυτότητάς σας και την
                      αποτροπή πολλαπλών ψήφων στις ψηφοφορίες. Διασφαλίζουμε την προστασία των προσωπικών σας δεδομένων
                      σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR).
                    </p>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={onClose} type="button">
                      Ακύρωση
                    </Button>
                    <Button type="submit">Υποβολή για επαλήθευση</Button>
                  </DialogFooter>
                </form>
              </Form>
            ) : (
              <div className="p-4 flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-green-700">Επαληθευμένος Λογαριασμός</h3>
                <p className="text-center text-gray-600 mt-2">
                  Έχετε ήδη επαληθεύσει τα στοιχεία σας. Μπορείτε να προχωρήσετε στη συμπλήρωση των υπόλοιπων στοιχείων του
                  προφίλ σας.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="basic">
            <Form {...basicForm}>
              <form onSubmit={basicForm.handleSubmit(onBasicSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={basicForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Όνομα</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={basicForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Επώνυμο</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={basicForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={basicForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Τηλέφωνο</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormDescription>
                        Προαιρετικό: εισάγετε το κινητό ή σταθερό τηλέφωνό σας
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Αποθήκευση αλλαγών</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="demographics">
            <Form {...demographicsForm}>
              <form onSubmit={demographicsForm.handleSubmit(onDemographicsSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={demographicsForm.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Φύλο</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Επιλέξτε φύλο" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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
                    control={demographicsForm.control}
                    name="ageRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ηλικιακή Ομάδα</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Επιλέξτε ηλικιακή ομάδα" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="18-24">18-24</SelectItem>
                            <SelectItem value="25-34">25-34</SelectItem>
                            <SelectItem value="35-44">35-44</SelectItem>
                            <SelectItem value="45-54">45-54</SelectItem>
                            <SelectItem value="55-64">55-64</SelectItem>
                            <SelectItem value="65+">65+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={demographicsForm.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Επαγγελματική Κατηγορία</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={demographicsForm.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Εκπαίδευση</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={demographicsForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Τοποθεσία</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={demographicsForm.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Κατάσταση Κόμματος</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={demographicsForm.control}
                  name="income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Επιπλέον Πληρωμές</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Αποθήκευση αλλαγών</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
