// app/api/poll-candidates/[id]/route.ts
import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import type { ResultSetHeader } from "mysql2/promise";

export const dynamic = "force-dynamic";

/**
 * DELETE /api/poll-candidates/:id
 */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  console.log("params:", params);
  const pcId = parseInt(params.id, 10);
  if (isNaN(pcId)) {
    return NextResponse.json(
      { error: "Invalid poll-candidate ID" },
      { status: 400 }
    );
  }

  try {
    const conn = await createConnection();
    const [result] = await conn.execute<ResultSetHeader>(
      `DELETE FROM poll_candidates WHERE id = ?`,
      [pcId]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }
    // 204 No Content (χωρίς σώμα)
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(`DELETE /api/poll-candidates/${pcId} error:`, err);
    return NextResponse.json(
      { error: "DB error" },
      { status: 500 }
    );
  }
}
