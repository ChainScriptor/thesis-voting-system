import { useEffect, useRef, useState } from 'react';

interface PollEvent {
    type: 'connected' | 'new_poll' | 'poll_update';
    poll?: any;
    message?: string;
}

interface UsePollsEventsReturn {
    isConnected: boolean;
    lastEvent: PollEvent | null;
}

export function usePollsEvents(): UsePollsEventsReturn {
    const [isConnected, setIsConnected] = useState(false);
    const [lastEvent, setLastEvent] = useState<PollEvent | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        console.log('Setting up SSE connection...');

        // Create EventSource connection
        const eventSource = new EventSource('/api/polls-events');
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log('SSE connection opened');
            setIsConnected(true);
        };

        eventSource.onmessage = (event) => {
            console.log('SSE message received:', event.data);
            try {
                const data: PollEvent = JSON.parse(event.data);
                console.log('Parsed SSE event:', data);
                setLastEvent(data);
            } catch (error) {
                console.error('Error parsing SSE event:', error);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            setIsConnected(false);

            // Attempt to reconnect after 3 seconds
            setTimeout(() => {
                console.log('Attempting to reconnect SSE...');
                if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
                    eventSourceRef.current = new EventSource('/api/polls-events');
                }
            }, 3000);
        };

        // Cleanup on unmount
        return () => {
            console.log('Cleaning up SSE connection');
            eventSource.close();
            eventSourceRef.current = null;
        };
    }, []);

    return {
        isConnected,
        lastEvent,
    };
}
