import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * DELETE /api/elections/:id/candidates/:candidateId
 * Διαγράφει τον συγκεκριμένο take-part (υποψήφιο) από μια εκλογή.
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string; candidateId: string } }
) {
  const electionId = parseInt(context.params.id, 10);
  const candidateId = parseInt(context.params.candidateId, 10);

  if (Number.isNaN(electionId) || Number.isNaN(candidateId)) {
    return NextResponse.json(
      { error: "Invalid electionId or candidateId" },
      { status: 400 }
    );
  }

  try {
    await prisma.takepart.delete({
      where: {
        electionId_candidateId: {
          electionId,
          candidateId,
        },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    console.error(
      `❌ DELETE /api/elections/${electionId}/candidates/${candidateId} error:`,
      error
    );
    return NextResponse.json(
      { error: "Failed to delete candidate from election" },
      { status: 500 }
    );
  }
}
