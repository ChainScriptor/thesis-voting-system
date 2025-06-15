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

// ─── GET ─────────────────────────────────────────────────────────────────────
// GET /api/poll-candidates?pollId=...
export async function GET(request: Request) {
  const url = new URL(request.url);
  const pollId = url.searchParams.get("pollId");
  if (!pollId) {
    return NextResponse.json({ error: "Missing pollId" }, { status: 400 });
  }
  try {
    const conn = await createConnection();
    const [rows] = await conn.execute<CandidateWithUser[]>(
      `SELECT pc.id, pc.poll_id, pc.user_id, pc.invited_at,
              u.fullName, u.email, u.occupation
       FROM poll_candidates pc
       JOIN \`user\` u ON u.id = pc.user_id
       WHERE pc.poll_id = ?`,
      [pollId]
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// ─── POST ────────────────────────────────────────────────────────────────────
// POST /api/poll-candidates
// body: { pollId: string, userId: number }
export async function POST(request: Request) {
  const { pollId, userId } = await request.json();
  if (!pollId || !userId) {
    return NextResponse.json({ error: "Missing pollId or userId" }, { status: 400 });
  }
  try {
    const conn = await createConnection();
    const [result] = await conn.execute<ResultSetHeader>(
      `INSERT INTO poll_candidates (poll_id, user_id) VALUES (?, ?)`,
      [pollId, userId]
    );
    const newId = result.insertId;
    const [rows] = await conn.execute<CandidateWithUser[]>(
      `SELECT pc.id, pc.poll_id, pc.user_id, pc.invited_at,
              u.fullName, u.email, u.occupation
       FROM poll_candidates pc
       JOIN \`user\` u ON u.id = pc.user_id
       WHERE pc.id = ?`,
      [newId]
    );
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("❌ POST /api/poll-candidates error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
