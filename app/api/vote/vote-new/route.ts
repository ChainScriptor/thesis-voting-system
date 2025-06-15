// app/api/vote-new/route.ts

import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

interface VoteBody {
  electionId: number;
  candidateId: number;
}

export async function POST(request: Request) {
  try {
    // 1) Βεβαιώσου ότι ο χρήστης είναι συνδεδεμένος μέσω Clerk
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2) Βρες το πραγματικό user.id από το clerkId
    const conn = await createConnection();
    const [rowsUser] = await conn.execute<RowDataPacket[]>(
      "SELECT id FROM `user` WHERE clerkId = ?",
      [clerkId]
    );
    if (!Array.isArray(rowsUser) || rowsUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const realUserId = (rowsUser[0] as RowDataPacket).id as number;

    // 3) Διάβασε και επιβεβαίωσε το payload
    const body: VoteBody = await request.json();
    const { electionId, candidateId } = body;
    if (
      typeof electionId !== "number" ||
      typeof candidateId !== "number"
    ) {
      return NextResponse.json(
        {
          error: "Invalid payload: electionId and candidateId must be numbers.",
        },
        { status: 400 }
      );
    }

    // 4) Έλεγξε αν ο χρήστης έχει ήδη ψηφίσει σε αυτήν την election
    const [rowsVote] = await conn.execute<RowDataPacket[]>(
      `SELECT id
         FROM Vote
        WHERE userId = ? AND electionId = ?`,
      [realUserId, electionId]
    );
    if (Array.isArray(rowsVote) && rowsVote.length > 0) {
      // Conflict: Έχει ήδη ψηφίσει
      return NextResponse.json(
        { error: "You have already voted in this election." },
        { status: 409 }
      );
    }

    // 5) Καταχώριση νέας ψήφου
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO Vote (userId, electionId, candidateId)
         VALUES (?, ?, ?)`,
        [realUserId, electionId, candidateId]
      );
      return NextResponse.json({
        success: true,
        insertId: result.insertId,
      });
    } catch (errInsert) {
      console.error("Insert Vote error:", errInsert);
      return NextResponse.json(
        { error: "Failed to record vote (DB constraint)." },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("POST /api/vote-new error:", e);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
