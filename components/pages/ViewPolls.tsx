
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {  Search } from 'lucide-react';
import pollService from '@/services/pollService';
import { Poll } from '@/types/poll';
import { Toggle } from '@/components/ui/toggle';
import VotingDialog from '@/components/polls/VotingDialog';
import { format } from 'date-fns';
import VerificationBar from '@/components/verification/VerificationBar';

const ViewPolls = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [votedPolls, setVotedPolls] = useState<string[]>([]);

  useEffect(() => {
    const checkUserVerification = () => {
      setIsVerified(localStorage.getItem('userVerified') === 'true');
    };
    const loadVotedPolls = () => {
      const saved = localStorage.getItem('votedPolls');
      if (saved) setVotedPolls(JSON.parse(saved));
    };
    checkUserVerification();
    loadVotedPolls();
  }, []);

  const { data: polls = [] } = useQuery({
    queryKey: ['polls'],
    queryFn: pollService.getPolls,
  });

  const isActivePage = pathname.includes('/active');

  useEffect(() => {
    if (isActivePage) setFilter('active');
  }, [isActivePage]);


  const filteredPolls = polls.filter(poll => {
    const matchFilter = filter === 'active' ? poll.isActive : filter === 'completed' ? !poll.isActive : true;
    const matchSearch = searchTerm ? poll.title.toLowerCase().includes(searchTerm.toLowerCase()) || poll.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchFilter && matchSearch;
  });

  const handleVoteClick = (poll: Poll) => {
    if (!isVerified) {
      toast({
        title: 'Απαιτείται επαλήθευση',
        description: 'Πρέπει να συμπληρώσετε τα στοιχεία σας.',
        variant: 'destructive',
      });
      return;
    }
    if (votedPolls.includes(poll.id)) {
      toast({ title: 'Έχετε ήδη ψηφίσει', description: '', variant: 'default' });
      return;
    }
    setSelectedPoll(poll);
    setIsDialogOpen(true);
  };

  const handleVoteSubmit = (pollId: string) => {
    const updated = [...votedPolls, pollId];
    setVotedPolls(updated);
    localStorage.setItem('votedPolls', JSON.stringify(updated));
    toast({ title: 'Η ψήφος υποβλήθηκε με επιτυχία' });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <VerificationBar isVerified={isVerified} />

      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/90 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Ηλεκτρονικές Ψηφοφορίες
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Αναζήτηση"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md w-64"
              />
            </div>
            <Button onClick={() => router.push('/polls')}>Διαχείριση</Button>
            <Button onClick={() => {
              const status = !isVerified;
              setIsVerified(status);
              localStorage.setItem('userVerified', String(status));
              toast({
                title: status ? 'Επαληθευμένος' : 'Επαλήθευση αφαιρέθηκε',
              });
            }}>
              {isVerified ? 'Αφαίρεση Επαλήθευσης' : 'Επαλήθευση'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-lg font-semibold">Σύνολο Ψηφοφοριών: {polls.length}</div>
          <div className="flex gap-2">
            <Toggle pressed={filter === 'active'} onPressedChange={() => setFilter('active')}>Ενεργές</Toggle>
            <Toggle pressed={filter === 'completed'} onPressedChange={() => setFilter('completed')}>Ολοκληρωμένες</Toggle>
            <Toggle pressed={filter === 'all'} onPressedChange={() => setFilter('all')}>Όλες</Toggle>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map(poll => (
            <Card key={poll.id}>
              <CardHeader>
                <CardTitle>{poll.title}</CardTitle>
                <CardDescription>{poll.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Λήξη: {format(new Date(poll.dateRange.endDate), 'dd/MM/yyyy')}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleVoteClick(poll)} disabled={!poll.isActive || votedPolls.includes(poll.id)}>
                  {votedPolls.includes(poll.id) ? 'Ψηφίσατε' : 'Ψήφισε'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {selectedPoll && (
        <VotingDialog
          poll={selectedPoll}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleVoteSubmit}
        />
      )}
    </div>
  );
};

export default ViewPolls;
