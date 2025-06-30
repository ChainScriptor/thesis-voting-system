"use client";

import { useState } from "react";
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
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const pollSchema = z.object({
  title: z.string().min(5, "Ο τίτλος πρέπει να έχει τουλάχιστον 5 χαρακτήρες."),
  description: z.string().optional(),
  dateRange: z.object({
    from: z.date({ required_error: "Η ημερομηνία έναρξης είναι υποχρεωτική." }),
    to: z.date({ required_error: "Η ημερομηνία λήξης είναι υποχρεωτική." }),
  }),
  options: z.array(
    z.object({
      value: z.string().min(1, "Η επιλογή δεν μπορεί να είναι κενή."),
    })
  ).min(2, "Πρέπει να υπάρχουν τουλάχιστον 2 επιλογές."),
});

type PollFormValues = z.infer<typeof pollSchema>;

export default function CreatePollPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PollFormValues>({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      title: "",
      description: "",
      options: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  async function onSubmit(data: PollFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/elections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          start_date: data.dateRange.from.toISOString(),
          end_date: data.dateRange.to.toISOString(),
          options: data.options.map(o => o.value), // Στέλνουμε μόνο τις τιμές
        }),
      });

      if (!response.ok) {
        throw new Error('Η δημιουργία της ψηφοφορίας απέτυχε.');
      }

      toast({
        title: "Επιτυχία!",
        description: "Η ψηφοφορία δημιουργήθηκε.",
      });
      router.push("/admin/polls");

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
                      selected={{from: field.value?.from, to: field.value?.to}}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Επιλογές Ψηφοφορίας</FormLabel>
            <div className="space-y-4 mt-2">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`options.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                           <Input {...field} placeholder={`Επιλογή #${index + 1}`} />
                        </FormControl>
                        {fields.length > 2 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4"/>
                Προσθήκη Επιλογής
              </Button>
            </div>
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Αποθήκευση..." : "Δημιουργία Ψηφοφορίας"}
          </Button>
        </form>
      </Form>
    </div>
  );
}