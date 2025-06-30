// app/api/verify_extra-check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clerkId } = body;

  if (!clerkId) {
    return NextResponse.json({ success: false, message: "Λείπει το clerkId" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
        where: { clerkId: clerkId },
        select: {
            gender: true,
            birthdate: true,
            occupation: true,
            location: true,
        }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("DB check error:", error);
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
}
