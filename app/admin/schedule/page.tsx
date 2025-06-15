// app/admin/schedule/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { el } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface Election {
  id: number;
  title: string;
  description: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  createdAt: string;
  candidates: unknown[]; // 👈 λύση στο ESLint error
  targeting: {
    roles: string[];
    locations: string[];
  };
}

export default function SchedulePage() {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await fetch("/api/elections");
        if (!res.ok) throw new Error("Αποτυχία φόρτωσης");
        const data = await res.json();
        setElections(data);
      } catch (error) {
        console.error("Election fetch error:", error);
        toast({
          title: "Σφάλμα",
          description: "Αποτυχία φόρτωσης ψηφοφοριών",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchElections();
  }, [toast]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Όλες οι Ψηφοφορίες</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-16" />
                </CardContent>
              </Card>
            ))
          : elections.map((poll) => {
              const isExpired =
                new Date(poll.dateRange.endDate) < new Date();
              return (
                <Card
                  key={poll.id}
                  className="rounded-xl border border-gray-200"
                >
                  <CardContent className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {poll.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {format(
                        new Date(poll.dateRange.startDate),
                        "dd/MM/yyyy",
                        { locale: el }
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(poll.dateRange.endDate),
                        "dd/MM/yyyy",
                        { locale: el }
                      )}
                    </p>
                    <Badge
                      className={
                        isExpired
                          ? "bg-gray-200 text-gray-600 text-sm py-1 px-2 rounded-full"
                          : "bg-green-100 text-green-800 text-sm py-1 px-2 rounded-full"
                      }
                    >
                      {isExpired ? "Έληξε" : "Ενεργή"}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
}
