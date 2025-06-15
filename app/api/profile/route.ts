import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";

interface UserProfileRow extends RowDataPacket {
  gender: string | null;
  birthdate: string | null;
  occupation: string | null;
  location: string | null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");

  if (!clerkId) {
    return NextResponse.json({ success: false, message: "Missing clerkId" }, { status: 400 });
  }

  try {
    const conn = await createConnection();
    const [rows] = await conn.execute<UserProfileRow[]>(
      'SELECT gender, birthdate, occupation, location FROM `user` WHERE `clerkId` = ?',
      [clerkId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });

  } catch (error) {
    console.error("❌ Error in /api/profile:", error);
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
}
