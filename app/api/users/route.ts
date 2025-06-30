// app/api/users/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  try {
    const users = await prisma.user.findMany({
      where: search
        ? {
            OR: [
              { fullName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { occupation: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      select: {
        id: true,
        clerkId: true,
        fullName: true,
        username: true,
        email: true,
        occupation: true,
        location: true,
        gender: true,
      },
    });
    return NextResponse.json(users);
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
    const u = await clerkClient.users.getUser(clerkId);

    const fullName = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.username || "Unknown User";
    const username = u.username ?? u.primaryEmailAddress?.emailAddress ?? "";
    const email = u.primaryEmailAddress?.emailAddress;

    if (!email) {
       return NextResponse.json(
        { success: false, message: "User has no primary email address." },
        { status: 400 }
      );
    }
    
    // Custom metadata from Clerk
    const gender = (u.publicMetadata.gender as string) ?? null;
    const birthdateStr = (u.publicMetadata.birthdate as string) ?? null;
    const occupation = (u.publicMetadata.occupation as string) ?? null;
    const location = (u.publicMetadata.location as string) ?? null;
    const birthdate = birthdateStr ? new Date(birthdateStr) : null;


    const user = await prisma.user.upsert({
        where: { clerkId: clerkId },
        update: {
            fullName,
            username,
            email,
            gender,
            birthdate,
            occupation,
            location,
        },
        create: {
            clerkId,
            fullName,
            username,
            email,
            gender,
            birthdate,
            occupation,
            location,
            // Add default required fields that are not coming from clerk
            password: "", // Assuming password is not synced from Clerk, add a placeholder
            isAdmin: false, // Default value
        }
    });

    return NextResponse.json({ success: true, user: user });
  } catch (error) {
    console.error("❌ Error in /api/users [POST]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to sync user." },
      { status: 500 }
    );
  }
}
