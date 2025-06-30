// app/api/poll-candidates/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * DELETE /api/poll-candidates/:id
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const pcId = parseInt(params.id, 10);
  if (isNaN(pcId)) {
    return NextResponse.json(
      { error: "Invalid poll-candidate ID" },
      { status: 400 }
    );
  }

  try {
    await prisma.poll_candidates.delete({
      where: { id: pcId },
    });
    // 204 No Content (χωρίς σώμα)
    return new NextResponse(null, { status: 204 });
  } catch (err) {
     // Prisma throws an error if the record to delete is not found, P2025 is the code for that.
    if (err instanceof Error && 'code' in err && err.code === 'P2025') {
       return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }
    console.error(`DELETE /api/poll-candidates/${pcId} error:`, err);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}