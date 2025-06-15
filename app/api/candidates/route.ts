// app/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";  // βεβαιώσου ότι εκθέτεις σωστά τον PrismaClient

export async function GET(request: Request) {
  const { search } = Object.fromEntries(new URL(request.url).searchParams);
  // αν ήρθε query ?search=foo → φιλτράρουμε, αλλιώς επιστρέφουμε όλους
  const where = search
    ? {
        OR: [
          { fullName:   { contains: String(search), mode: "insensitive" } },
          { email:      { contains: String(search), mode: "insensitive" } },
          { occupation: { contains: String(search), mode: "insensitive" } },
        ]
      }
    : {};

  const users = await prisma.user.findMany({
    where,
    select: {
      id:      true,
      fullName:true,
      email:   true,
      occupation: true,
      location:   true,
      gender:     true,
      // άλλα πεδία αν χρειάζεσαι…
    }
  });

  return NextResponse.json(users);
}
