// app/api/poll-candidates/route.ts
import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

interface CandidateWithUser extends RowDataPacket {
  id: number;            // poll_candidates.id
  poll_id: number;
  user_id: number;
  invited_at: string;
  fullName: string;
  email: string;
  occupation: string | null;
}

// Αυτό το interface “κληρονομεί” από RowDataPacket
// ώστε το query<CandidateIdRow[]> να μην τσακώνεται με τον τύπο
interface CandidateIdRow extends RowDataPacket {
  candidate_id: number;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pollId = url.searchParams.get("pollId");
  if (!pollId) {
    return NextResponse.json({ error: "Missing pollId" }, { status: 400 });
  }
  try {
    const conn = await createConnection();
    // query<T[]> τώρα δέχεται T που κληρονομεί από RowDataPacket
    const [rows] = await conn.query<CandidateWithUser[]>(
      `SELECT pc.id, pc.poll_id, pc.user_id, pc.invited_at,
              u.fullName, u.email, u.occupation
       FROM poll_candidates pc
       JOIN \`user\` u ON u.id = pc.user_id
       WHERE pc.poll_id = ?`,
      [pollId],
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { pollCandidateId, pollId, userId } = body;

  // 1) αν λάβαμε pollCandidateId → επιστρέφουμε το candidate_id
  if (typeof pollCandidateId === "number") {
    try {
      const conn = await createConnection();
      // query<T[]> με CandidateIdRow[]
      const [lookup] = await conn.query<CandidateIdRow[]>(
        `SELECT candidate_id
         FROM poll_candidates
         WHERE id = ?`,
        [pollCandidateId],
      );
      if (!lookup.length) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ candidateId: lookup[0].candidate_id });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  // 2) αλλιώς περιμένουμε pollId + userId για insert
  if (!pollId || typeof userId !== "number") {
    return NextResponse.json({ error: "Missing pollId or userId" }, { status: 400 });
  }
  try {
    const conn = await createConnection();
    // execute για το INSERT
    const [result] = await conn.execute<ResultSetHeader>(
      `INSERT INTO poll_candidates (poll_id, user_id) VALUES (?, ?)`,
      [pollId, userId],
    );
    const newId = result.insertId;

    // query<CandidateWithUser[]> για να διαβάσουμε το νέο row
    const [rows2] = await conn.query<CandidateWithUser[]>(
      `SELECT pc.id, pc.poll_id, pc.user_id, pc.invited_at,
              u.fullName, u.email, u.occupation
       FROM poll_candidates pc
       JOIN \`user\` u ON u.id = pc.user_id
       WHERE pc.id = ?`,
      [newId],
    );
    if (!rows2.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(rows2[0]);
  } catch (err) {
    console.error("❌ POST /api/poll-candidates error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
