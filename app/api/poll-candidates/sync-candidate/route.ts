// app/api/poll-candidates/sync-candidate/route.ts

import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

interface PollCandidateRow extends RowDataPacket {
  id: number;
  poll_id: number;
  user_id: number;
  invited_at: string;
}
interface UserRow extends RowDataPacket {
  id: number;
  fullName: string;
  email: string;
  occupation: string | null;
}

export async function POST(request: Request) {
  try {
    const { pollCandidateId } = await request.json();
    if (typeof pollCandidateId !== "number") {
      return NextResponse.json(
        { error: "Missing or invalid pollCandidateId" },
        { status: 400 }
      );
    }

    // 1) Παίρνουμε το poll_candidates row για να βρούμε user_id
    const conn = await createConnection();
    const [pcRows] = await conn.execute<PollCandidateRow[]>(
      `SELECT * FROM poll_candidates WHERE id = ?`,
      [pollCandidateId]
    );
    if (pcRows.length === 0) {
      return NextResponse.json(
        { error: "PollCandidate not found" },
        { status: 404 }
      );
    }
    const pcRow = pcRows[0];

    // 2) Πάρε το fullName από τον πίνακα user για το user_id
    const [userRows] = await conn.execute<UserRow[]>(
      `SELECT id, fullName FROM \`user\` WHERE id = ?`,
      [pcRow.user_id]
    );
    if (userRows.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    const userRow = userRows[0];

    // 3) Ελέγχουμε αν ήδη υπάρχει εγγραφή στον πίνακα candidate με το ίδιο όνομα
    const [existingCandidateRows] = await conn.execute<RowDataPacket[]>(
      `SELECT id FROM candidate WHERE name = ?`,
      [userRow.fullName]
    );
    if (existingCandidateRows.length > 0) {
      // Όταν κάνουμε `execute<RowDataPacket[]>`, κάθε row είναι RowDataPacket,
      // άρα το id το παίρνουμε ασφαλώς ως (existingCandidateRows[0] as { id: number }).id
      const existingId = (existingCandidateRows[0] as { id: number }).id;
      return NextResponse.json({ candidateId: existingId });
    }

    // 4) Δεν βρέθηκε: κάνε INSERT στον πίνακα candidate
    const [insertResult] = await conn.execute<ResultSetHeader>(
      `INSERT INTO candidate (name, description, image, is_person) VALUES (?, NULL, NULL, TRUE)`,
      [userRow.fullName]
    );
    const newCandidateId = insertResult.insertId;

    return NextResponse.json({ candidateId: newCandidateId });
  } catch (err) {
    console.error("POST /api/poll-candidates/sync-candidate error:", err);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
