// app/api/profile-sync/route.ts - ΑΠΛΟΠΟΙΗΜΕΝΗ ΕΔΩΣΗ

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { clerkId, email, fullName, username } = await request.json();

    if (!clerkId || !email) {
      return NextResponse.json(
        { success: false, message: "Λείπουν απαραίτητα πεδία" },
        { status: 400 }
      );
    }

    // Απλούστερο query - μόνο τα βασικά
    const existingUser = await prisma.user.findFirst({
      where: { clerkId }
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "User already exists",
        user: {
          id: existingUser.id,
          clerkId: existingUser.clerkId,
          email: existingUser.email,
          fullName: existingUser.fullName,
          username: existingUser.username,
          hasProfile: true,
          profile: {
            gender: existingUser.gender,
            birthdate: existingUser.birthdate,
            occupation: existingUser.occupation,
            location: existingUser.location
          }
        }
      });
    }

    // Δημιουργία νέου χρήστη
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
        fullName: fullName || "",
        username: username || "",
        profileCompleted: false,
        location: "",
        occupation: "",
        birthdate: null,
        gender: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile synced successfully",
      user: {
        ...newUser,
        hasProfile: false,
        profile: {
          gender: null,
          birthdate: null,
          occupation: null,
          location: null
        }
      }
    });

  } catch (error) {
    console.error('❌ Error in /api/profile-sync:', error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}