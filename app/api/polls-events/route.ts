import { NextRequest } from 'next/server';

// Store active connections
const connections = new Set<ReadableStreamDefaultController>();

export async function GET(request: NextRequest) {
    console.log('SSE endpoint called');

    // Create a readable stream for SSE
    const stream = new ReadableStream({
        start(controller) {
            console.log('SSE stream started');
            // Add this connection to our set
            connections.add(controller);
            console.log(`Total connections: ${connections.size}`);

            // Send initial connection message
            const data = `data: ${JSON.stringify({ type: 'connected', message: 'Connected to polls events' })}\n\n`;
            controller.enqueue(new TextEncoder().encode(data));

            // Handle client disconnect
            request.signal.addEventListener('abort', () => {
                console.log('Client disconnected');
                connections.delete(controller);
                controller.close();
            });
        },
        cancel(controller) {
            console.log('SSE stream cancelled');
            connections.delete(controller);
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Cache-Control',
        },
    });
}

// Function to broadcast new poll to all connected clients
export function broadcastNewPoll(pollData: unknown) {
    console.log(`Broadcasting to ${connections.size} connected clients`);
    const message = `data: ${JSON.stringify({ type: 'new_poll', poll: pollData })}\n\n`;
    const encodedMessage = new TextEncoder().encode(message);

    connections.forEach((controller, index) => {
        try {
            console.log(`Sending to connection ${index}`);
            controller.enqueue(encodedMessage);
        } catch (error) {
            console.log(`Error sending to connection ${index}:`, error);
            // Remove dead connections
            connections.delete(controller);
        }
    });
}

// Function to broadcast poll update to all connected clients
export function broadcastPollUpdate(pollData: unknown) {
    const message = `data: ${JSON.stringify({ type: 'poll_update', poll: pollData })}\n\n`;
    const encodedMessage = new TextEncoder().encode(message);

    connections.forEach(controller => {
        try {
            controller.enqueue(encodedMessage);
        } catch {
            // Remove dead connections
            connections.delete(controller);
        }
    });
}
