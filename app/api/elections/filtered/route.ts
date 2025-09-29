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

        // Query για ψηφοφορίες που μπορεί να δει ο χρήστης
        const elections = await prisma.election.findMany({
            where: {
                is_active: true,
                OR: [
                    { voting_type: "public" },
                    { voting_type: "private" },
                    {
                        voting_type: "invitation_only",
                        invitations: {
                            some: {
                                userId: dbUser.id
                            }
                        }
                    },
                    { voting_type: "restricted" } // Φέρνουμε όλες τις περιορισμένες και τις φιλτράρουμε μετά
                ]
            },
            include: {
                poll_candidates: { include: { user: true } },
                invitations: {
                    where: { userId: dbUser.id }
                }
            },
            orderBy: { start_date: "desc" },
        });

        // Φιλτράρουμε τις περιορισμένες ψηφοφορίες βάσει των δημογραφικών στοιχείων
        const filteredElections = elections.filter(election => {
            if (election.voting_type !== "restricted") {
                return true; // Δημόσιες, ιδιωτικές και προσκεκλημένες περνάνε όλες
            }

            // Έλεγχος targeting criteria - ΑΚΡΙΒΗΣ ταίριασμα
            // Αν δεν έχει κανένα criteria, δεν εμφανίζεται σε κανέναν
            const hasAnyCriteria = election.target_occupation || election.target_location ||
                election.target_gender || election.birthdate_min || election.birthdate_max;

            if (!hasAnyCriteria) {
                return false; // Αν δεν έχει criteria, δεν εμφανίζεται
            }

            // Έλεγχος επαγγέλματος - ΑΚΡΙΒΗΣ ταίριασμα
            if (election.target_occupation && election.target_occupation !== "") {
                if (!dbUser.occupation || dbUser.occupation !== election.target_occupation) {
                    return false;
                }
            }

            // Έλεγχος τοποθεσίας - ΑΚΡΙΒΗΣ ταίριασμα
            if (election.target_location && election.target_location !== "") {
                if (!dbUser.location || dbUser.location !== election.target_location) {
                    return false;
                }
            }

            // Έλεγχος φύλου - ΑΚΡΙΒΗΣ ταίριασμα
            if (election.target_gender && election.target_gender !== "") {
                if (!dbUser.gender || dbUser.gender !== election.target_gender) {
                    return false;
                }
            }

            // Έλεγχος ηλικίας - ΑΚΡΙΒΗΣ ταίριασμα εντός ορίων
            if (election.birthdate_min || election.birthdate_max) {
                if (!dbUser.birthdate) {
                    return false;
                }
                if (election.birthdate_min && dbUser.birthdate < election.birthdate_min) {
                    return false;
                }
                if (election.birthdate_max && dbUser.birthdate > election.birthdate_max) {
                    return false;
                }
            }

            return true; // Όλα τα criteria ταιριάζουν ΑΚΡΙΒΩΣ
        });

        const formatted = filteredElections.map((el) => ({
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
    } catch (err) {
        console.error('GET /api/elections/filtered error:', err);
        return NextResponse.json({
            error: "Internal Server Error",
            details: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}
