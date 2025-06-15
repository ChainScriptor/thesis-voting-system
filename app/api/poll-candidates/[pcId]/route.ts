import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const pcId = url.pathname.split("/").pop(); // παίρνει το ID από το path

  if (!pcId) {
    return NextResponse.json({ error: "Missing poll candidate ID" }, { status: 400 });
  }

  try {
    const conn = await createConnection();
    await conn.execute(`DELETE FROM poll_candidates WHERE id = ?`, [pcId]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
