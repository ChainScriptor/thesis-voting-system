import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    console.log('Starting candidate creation...');

    // Get all users that don't have a corresponding candidate
    const users = await prisma.user.findMany({
      where: {
        candidates: {
          none: {}
        }
      }
    });

    console.log(`Found ${users.length} users without candidates`);

    const createdCandidates = [];

    for (const user of users) {
      console.log(`Creating candidate for user: ${user.fullName}`);
      
      const candidate = await prisma.candidate.create({
        data: {
          name: user.fullName,
          description: `Αυτόματος υποψήφιος`,
          image: "https://via.placeholder.com/150",
          is_person: true,
          clerkId: user.clerkId,
        }
      });
      
      createdCandidates.push(candidate);
      console.log(`Created candidate with ID: ${candidate.id}`);
    }

    console.log(`Successfully created ${createdCandidates.length} candidates`);

    return NextResponse.json({
      success: true,
      message: `Created ${createdCandidates.length} candidates`,
      candidates: createdCandidates
    });
  } catch (error) {
    console.error("POST /api/create-candidates error:", error);
    return NextResponse.json(
      { error: "Failed to create candidates" },
      { status: 500 }
    );
  }
} 