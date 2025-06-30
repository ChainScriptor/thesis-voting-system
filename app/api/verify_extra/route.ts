// app/api/verify_extra/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { idNumber, gender, birthdate, occupation, location } = body;

  if (!idNumber || !gender || !birthdate || !occupation || !location) {
    return NextResponse.json(
      { success: false, message: "Λείπουν πεδία προς αποθήκευση." },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId: idNumber,
      },
      data: {
        gender,
        birthdate: new Date(birthdate), // Ensure birthdate is a Date object
        occupation,
        location,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    // P2025: Record to update not found.
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
       return NextResponse.json(
        { success: false, message: "Δεν βρέθηκε χρήστης με αυτό το clerkId." },
        { status: 404 }
      );
    }
    console.error("DB error:", error);
    return NextResponse.json(
      { success: false, message: "Σφάλμα βάσης δεδομένων." },
      { status: 500 }
    );
  }
}