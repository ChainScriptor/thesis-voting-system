import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Απλό test API που δεν χρειάζεται database
        const testPolls = [
            {
                id: 1,
                title: "Δοκιμαστική Ψηφοφορία",
                description: "Αυτή είναι μια δοκιμαστική ψηφοφορία",
                voting_type: "public",
                access_code: null,
                dateRange: {
                    startDate: new Date().toISOString(),
                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 μέρες από τώρα
                },
                targeting: {
                    roles: [],
                    locations: [],
                },
                candidates: [
                    { id: 1, fullName: "Επιλογή 1", email: null, occupation: null },
                    { id: 2, fullName: "Επιλογή 2", email: null, occupation: null },
                ],
                createdAt: new Date().toISOString(),
                isActive: true,
            }
        ];

        return NextResponse.json(testPolls);
    } catch (err) {
        console.error("Test API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


