// app/api/verify_extra-check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clerkId } = body;

  if (!clerkId) {
    return NextResponse.json({ success: false, message: "Λείπει το clerkId" }, { status: 400 });
  }

  try {
    const conn = await createConnection();
    const [rows] = await conn.execute(
      `SELECT gender, birthdate, occupation, location FROM users WHERE clerkId = ? LIMIT 1`,
      [clerkId]
    );
    const data = Array.isArray(rows) ? rows[0] : null;

    if (!data) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("DB check error:", error);
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
}
