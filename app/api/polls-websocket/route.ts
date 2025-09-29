import { NextRequest } from 'next/server';

// Store active WebSocket connections
const connections = new Set<WebSocket>();

export async function GET(request: NextRequest) {
    // Check if this is a WebSocket upgrade request
    if (request.headers.get('upgrade') !== 'websocket') {
        return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    // For now, return a simple response since Next.js doesn't support WebSocket upgrades directly
    return new Response('WebSocket not supported in Next.js App Router', { status: 501 });
}

// Function to broadcast new poll to all connected clients
export function broadcastNewPoll(pollData: any) {
    console.log(`Broadcasting to ${connections.size} WebSocket connections`);
    const message = JSON.stringify({ type: 'new_poll', poll: pollData });

    connections.forEach((ws, index) => {
        try {
            if (ws.readyState === WebSocket.OPEN) {
                console.log(`Sending to WebSocket connection ${index}`);
                ws.send(message);
            } else {
                console.log(`WebSocket connection ${index} is not open, removing`);
                connections.delete(ws);
            }
        } catch (error) {
            console.log(`Error sending to WebSocket connection ${index}:`, error);
            connections.delete(ws);
        }
    });
}

