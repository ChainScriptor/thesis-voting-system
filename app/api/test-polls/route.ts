// app/api/test-polls/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        console.log("🔍 Test API: Starting poll fetch...");

        // Get all elections without any filters
        const allElections = await prisma.election.findMany({
            include: { takepart: { include: { user: true } } },
            orderBy: { start_date: "desc" },
        });

        console.log("📊 All elections found:", allElections.length);
        allElections.forEach(election => {
            console.log(`- ${election.title} (${election.voting_type}) - Active: ${election.is_active}`);
        });

        // Get user info
        const authData = await auth();
        const userId = authData.userId;
        console.log("👤 User ID:", userId);

        if (!userId) {
            return NextResponse.json({
                error: "Not authenticated",
                allElections: allElections.length,
                elections: allElections.map(el => ({
                    id: el.id,
                    title: el.title,
                    voting_type: el.voting_type,
                    is_active: el.is_active
                }))
            }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true, gender: true, occupation: true, location: true, birthdate: true }
        });

        console.log("👤 DB User:", dbUser);

        if (!dbUser) {
            return NextResponse.json({
                error: "User not found in database",
                allElections: allElections.length,
                elections: allElections.map(el => ({
                    id: el.id,
                    title: el.title,
                    voting_type: el.voting_type,
                    is_active: el.is_active
                }))
            }, { status: 404 });
        }

        // Test the filtered query
        const filteredElections = await prisma.election.findMany({
            where: {
                AND: [
                    { is_active: true },
                    {
                        OR: [
                            { voting_type: "public" },
                            { voting_type: "private" },
                            {
                                AND: [
                                    { voting_type: "restricted" },
                                    { OR: [{ target_gender: dbUser.gender }, { target_gender: null }, { target_gender: "all" }] },
                                    { OR: [{ target_occupation: dbUser.occupation }, { target_occupation: null }, { target_occupation: "all" }] },
                                    { OR: [{ target_location: dbUser.location }, { target_location: null }, { target_location: "all" }] },
                                ]
                            }
                        ]
                    }
                ],
            },
            include: { takepart: { include: { user: true } } },
            orderBy: { start_date: "desc" },
        });

        console.log("✅ Filtered elections:", filteredElections.length);

        return NextResponse.json({
            success: true,
            allElections: allElections.length,
            filteredElections: filteredElections.length,
            user: dbUser,
            elections: filteredElections.map(el => ({
                id: el.id,
                title: el.title,
                voting_type: el.voting_type,
                is_active: el.is_active,
                access_code: el.access_code,
                target_occupation: el.target_occupation,
                target_location: el.target_location,
                target_gender: el.target_gender
            }))
        });

    } catch (error) {
        console.error("❌ Test API Error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}


