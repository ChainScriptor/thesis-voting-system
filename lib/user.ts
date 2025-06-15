// lib/user.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function upsertUserFromClerk() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  await prisma.user.upsert({
    where: { id: userId },
    create: {
      id: userId,
      fullName: clerkUser.fullName || "",
      username: clerkUser.username || "",
      email: clerkUser.emailAddresses[0].emailAddress,
      isAdmin: false,
      // Τα υπόλοιπα μένουν κενά (null)
    },
    update: {
      fullName: clerkUser.fullName || "",
    },
  });
}
