// lib/user.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function upsertUserFromClerk() {
  const authData = await auth();
  const userId = authData.userId;
  if (!userId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Clerk user not found.");

  await prisma.user.upsert({
    where: { clerkId: userId },
    create: {
      clerkId: userId,
      fullName: clerkUser.fullName || "",
      username: clerkUser.username || "",
      email: clerkUser.emailAddresses[0].emailAddress,
      isAdmin: true,
      password: "-",
      // Τα υπόλοιπα μένουν κενά (null)
    },
    update: {
      fullName: clerkUser.fullName || "",
    },
  });
}
