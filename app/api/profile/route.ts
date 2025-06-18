// app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ProfileData {
  gender: string | null;
  birthdate: string | null;
  occupation: string | null;
  location: string | null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");
  if (!clerkId) {
    return NextResponse.json(
      { success: false, message: "Missing clerkId" },
      { status: 400 }
    );
  }

  try {
    // 1) Ψάχνουμε στον Prisma user table
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        gender: true,
        birthdate: true,
        occupation: true,
        location: true,
      },
    });

    // 2) Μετατρέπουμε το Date σε ISO string (ή null)
    const data: ProfileData = user
      ? {
          gender: user.gender,
          birthdate: user.birthdate
            ? user.birthdate.toISOString()
            : null,
          occupation: user.occupation,
          location: user.location,
        }
      : {
          gender: null,
          birthdate: null,
          occupation: null,
          location: null,
        };

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in /api/profile:", error);
    return NextResponse.json(
      { success: false, message: "Database error" },
      { status: 500 }
    );
  }
}
