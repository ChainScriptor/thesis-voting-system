// app/api/elections/filtered/route.ts - ΑΠΛΟΠΟΙΗΜΕΝΗ ΕΔΩΣΗ

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Έλεγχος authentication
        const authData = await auth();
        const userId = authData.userId;

        if (!userId) {
            return NextResponse.json([], { status: 401 });
        }

        // Έλεγχος αν ο χρήστης υπάρχει στη βάση δεδομένων
        const dbUser = await prisma.user.findFirst({
            where: { clerkId: userId },
        });

        if (!dbUser) {
            return NextResponse.json([], { status: 401 });
        }

        // ΑΠΛΗ λογική - παρέχει μόνο ενεργές ψηφοφορίες για τυπικές περιπτώσεις
        const elections = await prisma.election.findMany({
            where: {
                is_active: true,
                OR: [
                    { voting_type: "public" },
                    { voting_type: "private" }
                ]
            },
            include: {
                poll_candidates: { include: { user: true } }
            },
            orderBy: { start_date: "desc" },
        });

        // Επίπεδη δομή για το frontend
        const formatted = elections.map((el) => ({
            id: el.id,
            title: el.title,
            description: el.description,
            voting_type: el.voting_type,
            access_code: el.access_code,
            dateRange: {
                startDate: el.start_date ? el.start_date.toISOString() : null,
                endDate: el.end_date ? el.end_date.toISOString() : null,
            },
            targeting: {
                roles: [],
                locations: [],
            },
            candidates: el.poll_candidates.map((pc) =>
                pc.user
                    ? pc.user
                    : { id: pc.id, fullName: pc.text_option || `Επιλογή ${pc.id}`, email: null, occupation: null }
            ),
            createdAt: el.start_date ? el.start_date.toISOString() : null,
            isActive: el.is_active,
        }));

        return NextResponse.json(formatted);
    } catch (err) {
        console.error('GET /api/elections/filtered error:', err);
        return NextResponse.json({
            error: "Internal Server Error - simplified version",
            details: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}