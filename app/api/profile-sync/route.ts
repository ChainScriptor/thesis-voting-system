import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { clerkId, email, fullName, username } = await request.json();

    // Έλεγχος για απαραίτητα πεδία
    if (!clerkId || !email) {
      return NextResponse.json(
        { success: false, message: "Λείπουν απαραίτητα πεδία (clerkId, email)" },
        { status: 400 }
      );
    }

    // Έλεγξε αν υπάρχει ήδη ο χρήστης στη βάση
    let user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        clerkId: true,
        email: true,
        fullName: true,
        username: true,
        isAdmin: true,
        gender: true,
        birthdate: true,
        occupation: true,
        location: true,
      },
    });

    // Αν δεν υπάρχει, δημιούργησε τον
    if (!user) {
      console.log(`🆕 Creating new user with clerkId: ${clerkId}`);
      
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          fullName: fullName || email.split('@')[0], // Fallback αν δεν έχει fullName
          username: username || email.split('@')[0], // Fallback αν δεν έχει username
          password: "", // Δεν χρησιμοποιούμε password με Clerk
          isAdmin: true,
        },
        select: {
          id: true,
          clerkId: true,
          email: true,
          fullName: true,
          username: true,
          isAdmin: true,
          gender: true,
          birthdate: true,
          occupation: true,
          location: true,
        },
      });
      
      console.log(`✅ User created successfully: ${user.email}`);
    } else {
      console.log(`👤 User already exists: ${user.email}`);
    }

    return NextResponse.json({
      success: true,
      message: user ? "User found/created successfully" : "Failed to create user",
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        isAdmin: user.isAdmin,
        hasProfile: !!(user.gender || user.birthdate || user.occupation || user.location),
        profile: {
          gender: user.gender,
          birthdate: user.birthdate,
          occupation: user.occupation,
          location: user.location,
        },
      },
    });

  } catch (error) {
    console.error("❌ Error in /api/profile-sync:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
} 