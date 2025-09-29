// app/api/elections/filtered/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // ✅ Πρώτα περιμένουμε το auth και μετά παίρνουμε userId
        const authData = await auth();
        const userId = authData.userId;

        if (!userId) {
            return NextResponse.json([], { status: 401 });
        }

        // φέρε user
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true, gender: true, occupation: true, location: true, birthdate: true }
        });

        if (!dbUser) {
            return NextResponse.json([], { status: 200 });
        }

        const whereClause = {
            AND: [
                { is_active: true }, // Μόνο ενεργές ψηφοφορίες
                {
                    OR: [
                        // Δημόσιες ψηφοφορίες - όλοι μπορούν να ψηφίσουν
                        { voting_type: "public" },
                        // Ιδιωτικές ψηφοφορίες - χρειάζεται κωδικός (θα ελεγχθεί στο frontend)
                        { voting_type: "private" },
                        // Προσκεκλημένοι - ελέγχουμε αν ο χρήστης είναι προσκεκλημένος
                        {
                            AND: [
                                { voting_type: "invitation_only" },
                                {
                                    invitations: {
                                        some: {
                                            userId: dbUser.id
                                        }
                                    }
                                }
                            ]
                        },
                        // Περιορισμένες ψηφοφορίες - απλοποιημένο filtering
                        {
                            AND: [
                                { voting_type: "restricted" },
                                {
                                    OR: [
                                        // Αν δεν έχει κανένα targeting criteria, εμφανίζεται σε όλους
                                        {
                                            AND: [
                                                { target_gender: null },
                                                { target_occupation: null },
                                                { target_location: null },
                                                { birthdate_min: null },
                                                { birthdate_max: null }
                                            ]
                                        },
                                        // Αν έχει criteria, ελέγχουμε αν ταιριάζουν (πιο ευέλικτα)
                                        {
                                            OR: [
                                                // Φύλο ταιριάζει ή είναι null
                                                { OR: [{ target_gender: null }, { target_gender: dbUser.gender }, { target_gender: "all" }] },
                                                // Επάγγελμα ταιριάζει ή είναι null  
                                                { OR: [{ target_occupation: null }, { target_occupation: dbUser.occupation }, { target_occupation: "all" }] },
                                                // Τοποθεσία ταιριάζει ή είναι null
                                                { OR: [{ target_location: null }, { target_location: dbUser.location }, { target_location: "all" }] },
                                                // Ηλικία εντός εύρους ή είναι null
                                                ...(dbUser.birthdate ? [
                                                    { OR: [{ birthdate_min: null }, { birthdate_min: { lte: dbUser.birthdate } }] },
                                                    { OR: [{ birthdate_max: null }, { birthdate_max: { gte: dbUser.birthdate } }] }
                                                ] : [])
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ],
        };

        const elections = await prisma.election.findMany({
            where: whereClause,
            include: {
                poll_candidates: { include: { user: true } },
                invitations: true
            },
            orderBy: { start_date: "desc" },
        });

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
                roles: el.target_occupation ? [el.target_occupation] : [],
                locations: el.target_location ? [el.target_location] : [],
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
    } catch (error) {
        console.error('Elections filtered error:', error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
