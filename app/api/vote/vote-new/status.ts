// app/api/vote-new/status.ts

import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import type { RowDataPacket } from "mysql2/promise";

export async function GET(request: Request) {
  try {
    // 1) Πάρε τον clerkId από το session
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2) Βρες το πραγματικό user.id στη βάση
    const conn = await createConnection();
    const [rowsUser] = await conn.execute<RowDataPacket[]>(
      "SELECT id FROM `user` WHERE clerkId = ?",
      [clerkId]
    );
    if (!Array.isArray(rowsUser) || rowsUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const realUserId = (rowsUser[0] as RowDataPacket).id as number;

    // 3) Διάβασε το electionId από τα query params
    const url = new URL(request.url);
    const electionIdParam = url.searchParams.get("electionId");
    if (!electionIdParam) {
      return NextResponse.json({ error: "Missing electionId" }, { status: 400 });
    }
    const electionId = parseInt(electionIdParam, 10);
    if (isNaN(electionId)) {
      return NextResponse.json({ error: "Invalid electionId" }, { status: 400 });
    }

    // 4) Έλεγξε αν υπάρχει ήδη εγγραφή στον πίνακα Vote
    const [rowsVote] = await conn.execute<RowDataPacket[]>(
      `SELECT id
         FROM Vote
        WHERE userId = ? AND electionId = ?`,
      [realUserId, electionId]
    );
    const hasVoted = Array.isArray(rowsVote) && rowsVote.length > 0;
    return NextResponse.json({ hasVoted });
  } catch (e) {
    console.error("GET /api/vote-new/status error:", e);
    return NextResponse.json(
      { error: "Failed to fetch voting status." },
      { status: 500 }
    );
  }
}
