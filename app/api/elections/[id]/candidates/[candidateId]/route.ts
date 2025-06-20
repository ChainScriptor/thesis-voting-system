// app/api/elections/[id]/candidates/[candidateId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/");
  const electionId = parseInt(parts[parts.length - 4], 10);
  const candidateId = parseInt(parts[parts.length - 1], 10);
  if (isNaN(electionId) || isNaN(candidateId)) {
    return NextResponse.json({ error: "Invalid ids" }, { status: 400 });
  }

  await prisma.takepart.delete({
    where: {
      electionId_candidateId: {
        electionId,
        candidateId,
      },
    },
  });

  return NextResponse.json({ success: true });
}
