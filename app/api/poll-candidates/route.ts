// app/api/poll-candidates/route.ts
import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

interface CandidateWithUser extends RowDataPacket {
  id: number;
  poll_id: number;
  user_id: number;
  invited_at: string;
  fullName: string;
  email: string;
  occupation: string | null;
}

export const dynamic = "force-dynamic";

/**
 * GET /api/poll-candidates?pollId=…
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const pollId = url.searchParams.get("pollId");
  if (!pollId) {
    return NextResponse.json({ error: "Missing pollId" }, { status: 400 });
  }

  try {
    const conn = await createConnection();
    const [rows] = await conn.query<CandidateWithUser[]>(
      `SELECT 
         pc.id, pc.poll_id, pc.user_id, pc.invited_at,
         u.fullName, u.email, u.occupation
       FROM poll_candidates pc
       JOIN \`user\` u ON u.id = pc.user_id
       WHERE pc.poll_id = ?`,
      [pollId]
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/poll-candidates error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

/**
 * POST /api/poll-candidates
 * body: { pollId: string, userId: number }
 */
export async function POST(request: Request) {
  const { pollId, userId } = await request.json();
  if (!pollId || typeof userId !== "number") {
    return NextResponse.json(
      { error: "Missing pollId or invalid userId" },
      { status: 400 }
    );
  }

  const poll_id_num = Number(pollId);
  if (isNaN(poll_id_num)) {
    return NextResponse.json(
      { error: "Invalid pollId" },
      { status: 400 }
    );
  }

  try {
    const conn = await createConnection();
    // 1) INSERT
    const [insertResult] = await conn.execute<ResultSetHeader>(
      `INSERT INTO poll_candidates (poll_id, user_id)
       VALUES (?, ?)`,
      [poll_id_num, userId]
    );
    const newId = insertResult.insertId;

    // 2) SELECT το νέο row για να το επιστρέψουμε
    const [rows2] = await conn.query<CandidateWithUser[]>(
      `SELECT 
         pc.id, pc.poll_id, pc.user_id, pc.invited_at,
         u.fullName, u.email, u.occupation
       FROM poll_candidates pc
       JOIN \`user\` u ON u.id = pc.user_id
       WHERE pc.id = ?`,
      [newId]
    );
    if (!rows2.length) {
      return NextResponse.json(
        { error: "Insert succeeded but row not found" },
        { status: 500 }
      );
    }
    return NextResponse.json(rows2[0]);
  } catch (err) {
    console.error("POST /api/poll-candidates error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
