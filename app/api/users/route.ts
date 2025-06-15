import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";

interface UserRow extends RowDataPacket {
  id: number;
  fullName: string;
  email: string;
  occupation: string;
  location: string;
  gender: string;
  avatarUrl?: string; // αν πρόκειται να φέρεις URL από βάση
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  try {
    const conn = await createConnection();

    const query = search
      ? `
        SELECT id, fullName, email, occupation, location, gender${process.env.DB_AVATAR_COLUMN ? `, avatarUrl` : ""}
        FROM user
        WHERE fullName LIKE ? OR email LIKE ? OR occupation LIKE ?
      `
      : `
        SELECT id, fullName, email, occupation, location, gender${process.env.DB_AVATAR_COLUMN ? `, avatarUrl` : ""}
        FROM user
      `;

    const values = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];

    const [rows] = await conn.execute<UserRow[]>(query, values);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Error in /api/users:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
