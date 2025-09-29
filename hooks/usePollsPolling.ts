import { useEffect, useRef, useState } from 'react';

interface Poll {
    id: number;
    title: string;
    description: string;
    voting_type?: string;
    access_code?: string | null;
    dateRange: { startDate: string; endDate: string };
    isActive?: boolean;
    candidates?: Array<{
        id: number;
        fullName?: string;
        text_option?: string;
        email?: string | null;
        occupation?: string | null;
    }>;
}

interface UsePollsPollingReturn {
    polls: Poll[];
    isLoading: boolean;
    lastUpdate: Date | null;
}

export function usePollsPolling(intervalMs: number = 5000): UsePollsPollingReturn {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchPolls = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/elections/filtered', {
                credentials: 'include'
            });

            if (response.ok) {
                const newPolls: Poll[] = await response.json();
                setPolls(prevPolls => {
                    // Check if polls have changed
                    const hasChanged = JSON.stringify(prevPolls) !== JSON.stringify(newPolls);
                    if (hasChanged) {
                        console.log('Polls updated via polling');
                        setLastUpdate(new Date());
                    }
                    return newPolls;
                });
            }
        } catch (error) {
            console.error('Error fetching polls:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchPolls();

        // Set up polling interval
        intervalRef.current = setInterval(fetchPolls, intervalMs);

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [intervalMs]);

    return {
        polls,
        isLoading,
        lastUpdate,
    };
}
