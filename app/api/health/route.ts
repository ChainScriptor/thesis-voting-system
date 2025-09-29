// app/api/health/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Έλεγχος σύνδεσης με τη βάση δεδομένων
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;

        // Έλεγχος αν υπάρχουν οι βασικοί πίνακες
        const userCount = await prisma.user.count();
        const electionCount = await prisma.election.count();

        return NextResponse.json({
            status: 'healthy',
            database: 'connected',
            tables: {
                users: userCount,
                elections: electionCount
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Health check failed:', error);

        return NextResponse.json({
            status: 'unhealthy',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
