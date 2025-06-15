// app/api/verify_extra/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

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
    const conn = await createConnection();
    const [updateResult] = await conn.execute<ResultSetHeader>(
      `UPDATE users
         SET gender     = ?,
             birthdate  = ?,
             occupation = ?,
             location   = ?
       WHERE clerkId   = ?`,
      [gender, birthdate, occupation, location, idNumber]
    );

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Δεν βρέθηκε χρήστης με αυτό το clerkId." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { success: false, message: "Σφάλμα βάσης δεδομένων." },
      { status: 500 }
    );
  }
}
