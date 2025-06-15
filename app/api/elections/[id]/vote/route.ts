import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const clerkId = session.userId;

  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user?.birthdate || !user.location || !user.occupation || !user.gender) {
    return NextResponse.json(
      { error: "Complete your profile before voting." },
      { status: 403 }
    );
  }

  const electionId = parseInt(params.id, 10);
  if (isNaN(electionId)) {
    return NextResponse.json({ error: "Invalid election ID" }, { status: 400 });
  }

  const { candidateId } = await request.json();
  if (typeof candidateId !== "number") {
    return NextResponse.json({ error: "Invalid candidate ID" }, { status: 400 });
  }

  try {
    const takePart = await prisma.takePart.update({
      where: {
        electionId_candidateId: {
          electionId,
          candidateId,
        },
      },
      data: {
        numberOfVotes: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, takePart });
  } catch (error) {
    console.error("❌ Failed to vote:", error);
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
