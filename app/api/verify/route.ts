// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      idNumber,       // clerkId
      gender,
      birthdate,
      occupation,
      location,
    } = body as {
      idNumber: string;
      gender: string;
      birthdate: string;
      occupation: string;
      location: string;
    };

    // 1) Έλεγχος όλων των πεδίων
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

    // 2) Υπάρχει ήδη χρήστης με αυτό το clerkId;
    const existing = await prisma.user.findUnique({
      where: { clerkId: idNumber },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Δεν βρέθηκε χρήστης με αυτό το ID." },
        { status: 404 }
      );
    }

    // 3) Κάνουμε update
    const updated = await prisma.user.update({
      where: { clerkId: idNumber },
      data: {
        gender,
        birthdate: new Date(birthdate),
        occupation,
        location,
      },
    });

    // 4) Επιστρέφουμε επιτυχία
    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error in /api/verify:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Απροσδιόριστο σφάλμα κατά την αποθήκευση.",
      },
      { status: 500 }
    );
  }
}
