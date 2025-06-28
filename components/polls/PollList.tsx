//app/components/polls/PollList.tsx
'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

type Candidate = {
  id: number;
  name: string;
};

type Poll = {
  id: string;
  title: string;
  description: string;
  dateRange: { startDate: string; endDate: string };
  candidates: Candidate[];
};

const PollList = () => {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await fetch('/api/elections/filtered');
        const data = await res.json();
        setPolls(data);
      } catch (error) {
        console.error('Failed to fetch polls:', error);
      }
    };

    fetchPolls();
    const intervalId = setInterval(fetchPolls, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Διαθέσιμες Ψηφοφορίες: {polls.length}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="rounded-lg border p-6 shadow-sm bg-white"
          >
            <h3 className="text-xl font-bold mb-2">{poll.title}</h3>
            <p className="text-gray-600 mb-3">{poll.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              Λήξη: {format(new Date(poll.dateRange.endDate), 'dd/MM/yyyy')}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Υποψήφιοι: {poll.candidates.length}
            </p>
            <Button disabled={poll.candidates.length === 0}>Ψήφισε</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollList;
