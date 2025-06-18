// app/api/users/route.ts

import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { clerkClient } from "@clerk/nextjs/server";

interface UserRow extends RowDataPacket {
  id: number;
  clerkId: string;
  fullName: string;
  username: string;
  email: string;
  occupation: string | null;
  location: string | null;
  gender: string | null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  try {
    const conn = await createConnection();

    const baseCols = `
      id,
      clerkId,
      fullName,
      username,
      email,
      occupation,
      location,
      gender
    `;

    const query = search
      ? `
        SELECT ${baseCols}
        FROM \`user\`
        WHERE fullName LIKE ? OR email LIKE ? OR occupation LIKE ?
      `
      : `
        SELECT ${baseCols}
        FROM \`user\`
      `;

    const values = search
      ? [`%${search}%`, `%${search}%`, `%${search}%`]
      : [];

    const [rows] = await conn.execute<UserRow[]>(query, values);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Error in /api/users [GET]:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { clerkId } = await request.json();

  if (!clerkId) {
    return NextResponse.json(
      { success: false, message: "Missing clerkId" },
      { status: 400 }
    );
  }

  try {
    // — CALL clerkClient() to get the real client instance —
    const cc = await clerkClient();
    const u = await cc.users.getUser(clerkId);

    const fullName = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.fullName;
    const username =
      u.primaryEmailAddress?.emailAddress ??
      u.emailAddresses[0]?.emailAddress ??
      "";
    const email = username;
    const gender = u.publicMetadata.gender ?? null;
    const birthdate = u.publicMetadata.birthdate ?? null;
    const occupation = u.publicMetadata.occupation ?? null;
    const location = u.publicMetadata.location ?? null;

    // Upsert into your MySQL `user` table
    const conn = await createConnection();
    const sql = `
      INSERT INTO \`user\`
        (clerkId, fullName, username, email, gender, birthdate, occupation, location)
      VALUES
        (?,       ?,        ?,        ?,     ?,      ?,         ?,          ?)
      ON DUPLICATE KEY UPDATE
        fullName   = VALUES(fullName),
        username   = VALUES(username),
        email      = VALUES(email),
        gender     = VALUES(gender),
        birthdate  = VALUES(birthdate),
        occupation = VALUES(occupation),
        location   = VALUES(location)
    `;
    const vals = [
      clerkId,
      fullName,
      username,
      email,
      gender,
      birthdate,
      occupation,
      location,
    ];
    const [result] = await conn.execute<ResultSetHeader>(sql, vals);

    return NextResponse.json({
      success: true,
      insertId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error in /api/users [POST]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to sync user." },
      { status: 500 }
    );
  }
}
