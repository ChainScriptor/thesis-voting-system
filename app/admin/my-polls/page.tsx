"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface UserPoll {
    id: number;
    title: string;
    description: string;
    voting_type: string;
    access_code: string | null;
    dateRange: {
        startDate: string | null;
        endDate: string | null;
    };
    isActive: boolean;
    candidates: Array<{
        id: number;
        name: string;
        type: string;
        votes: number;
    }>;
    totalVotes: number;
    createdAt: string | null;
}

export default function MyPollsPage() {
    const [polls, setPolls] = useState<UserPoll[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyPolls();
    }, []);

    const fetchMyPolls = async () => {
        try {
            const response = await fetch('/api/elections/my');
            if (response.ok) {
                const data = await response.json();
                setPolls(data);
            }
        } catch (error) {
            console.error('Error fetching polls:', error);
        } finally {
            setLoading(false);
        }
    };

    const deletePoll = async (pollId: number) => {
        if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την ψηφοφορία;')) {
            return;
        }

        try {
            const response = await fetch(`/api/elections/my?electionId=${pollId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPolls(polls.filter(poll => poll.id !== pollId));
                alert('Η ψηφοφορία διαγράφηκε επιτυχώς!');
            } else {
                alert('Σφάλμα κατά τη διαγραφή της ψηφοφορίας.');
            }
        } catch (error) {
            console.error('Error deleting poll:', error);
            alert('Σφάλμα κατά τη διαγραφή της ψηφοφορίας.');
        }
    };

    const getVotingTypeBadge = (type: string) => {
        switch (type) {
            case 'public':
                return <Badge variant="default" className="bg-green-100 text-green-800">🌐 Δημόσια</Badge>;
            case 'private':
                return <Badge variant="default" className="bg-orange-100 text-orange-800">🔒 Ιδιωτική</Badge>;
            case 'invitation_only':
                return <Badge variant="default" className="bg-blue-100 text-blue-800">📧 Προσκεκλημένοι</Badge>;
            case 'restricted':
                return <Badge variant="default" className="bg-purple-100 text-purple-800">🎯 Περιορισμένη</Badge>;
            default:
                return <Badge variant="secondary">{type}</Badge>;
        }
    };

    const getStatusBadge = (isActive: boolean, endDate: string) => {
        const now = new Date();
        const end = new Date(endDate);

        if (!isActive) {
            return <Badge variant="secondary">⏸️ Ανενεργή</Badge>;
        } else if (end < now) {
            return <Badge variant="destructive">🏁 Ολοκληρώθηκε</Badge>;
        } else {
            return <Badge variant="default" className="bg-green-100 text-green-800">🟢 Ενεργή</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4 md:p-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Φόρτωση...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Οι Ψηφοφορίες Μου</h1>
                    <p className="text-gray-600 mt-2">
                        Διαχείριση των ψηφοφοριών που έχεις δημιουργήσει
                    </p>
                </div>
                <Button onClick={() => window.location.href = '/admin/create-poll'}>
                    Δημιουργία Νέας Ψηφοφορίας
                </Button>
            </div>

            {polls.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-gray-400 mb-4">
                            <CalendarIcon className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Δεν έχεις δημιουργήσει ψηφοφορίες ακόμα</h3>
                        <p className="text-gray-600 text-center mb-4">
                            Ξεκίνα δημιουργώντας την πρώτη σου ψηφοφορία
                        </p>
                        <Button onClick={() => window.location.href = '/admin/create-poll'}>
                            Δημιουργία Ψηφοφορίας
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {polls.map((poll) => (
                        <Card key={poll.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-xl mb-2">{poll.title}</CardTitle>
                                        {poll.description && (
                                            <CardDescription className="text-base">
                                                {poll.description}
                                            </CardDescription>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 ml-4">
                                        {getVotingTypeBadge(poll.voting_type)}
                                        {getStatusBadge(poll.isActive, poll.dateRange.endDate)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        <span>
                                            <strong>Έναρξη:</strong> {poll.dateRange.startDate ? format(new Date(poll.dateRange.startDate), 'dd/MM/yyyy HH:mm') : 'Δεν ορίστηκε'}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        <span>
                                            <strong>Λήξη:</strong> {poll.dateRange.endDate ? format(new Date(poll.dateRange.endDate), 'dd/MM/yyyy HH:mm') : 'Δεν ορίστηκε'}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>
                                            <strong>Υποψήφιοι:</strong> {poll.candidates.length}
                                        </span>
                                    </div>
                                    {poll.access_code && (
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span>
                                                <strong>Κωδικός:</strong> {poll.access_code}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Αποτελέσματα ψηφοφορίας */}
                                {poll.candidates.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Αποτελέσματα ({poll.totalVotes} συνολικές ψήφοι):</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {poll.candidates.map((candidate) => (
                                                <div key={candidate.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                    <span className="font-medium">{candidate.name}</span>
                                                    <Badge variant="secondary">{candidate.votes} ψήφοι</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {poll.candidates.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Υποψήφιοι:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {poll.candidates.map((candidate) => (
                                                <Badge key={candidate.id} variant="outline">
                                                    {candidate.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => deletePoll(poll.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Διαγραφή
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
