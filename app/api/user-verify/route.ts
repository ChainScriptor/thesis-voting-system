import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Preflight για CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const {
      idNumber,       // clerkId
      gender,
      birthdate,
      occupation,
      location,
    } = (await request.json()) as {
      idNumber: string;
      gender: string;
      birthdate: string;
      occupation: string;
      location: string;
    };

    // Έλεγχος πεδίων
    if (
      !idNumber ||
      !gender ||
      !birthdate ||
      !occupation ||
      !location
    ) {
      return NextResponse.json(
        { success: false, message: "Λείπουν πεδία προς αποθήκευση." },
        { status: 400 }
      );
    }

    // Βρες τον χρήστη
    const existing = await prisma.user.findUnique({
      where: { clerkId: idNumber },
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Δεν βρέθηκε χρήστης με αυτό το ID." },
        { status: 404 }
      );
    }

    // Κάνε update
    const updated = await prisma.user.update({
      where: { clerkId: idNumber },
      data: {
        gender,
        birthdate: new Date(birthdate),
        occupation,
        location,
      },
    });

    // Επιστροφή επιτυχίας
    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error in /api/user-verify:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
} 