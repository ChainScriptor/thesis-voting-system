import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      idNumber,       // Clerk ID που συμπληρώνεται στη φόρμα
      gender,
      email,
      birthdate,
      occupation,
      location,
    } = body;

    // Έλεγχος αν υπάρχει χρήστης με το συγκεκριμένο clerkId
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: idNumber },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Ο χρήστης με το συγκεκριμένο ID δεν βρέθηκε." },
        { status: 404 }
      );
    }

    // Ενημέρωση πεδίων
    const updatedUser = await prisma.user.update({
      where: { clerkId: idNumber },
      data: {
        gender,
        email,
        birthdate: new Date(birthdate),
        occupation,
        location,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });

  } catch (error) {
  if (error instanceof Error) {
    console.error("Error updating user:", error.message);
    return NextResponse.json(
      { success: false, message: "Αποτυχία αποθήκευσης: " + error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Απροσδιόριστο σφάλμα κατά την αποθήκευση." },
    { status: 500 }
  );
}
}
