// scripts/fetchClerkUsers.ts

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

if (process.env.CLERK_SECRET_KEY && !process.env.CLERK_API_KEY) {
  process.env.CLERK_API_KEY = process.env.CLERK_SECRET_KEY;
}

import { PrismaClient } from '@prisma/client';
import { clerkClient } from '@clerk/clerk-sdk-node';

async function main() {
  const prisma = new PrismaClient();

  // Φέρε έως 100 χρήστες από Clerk
  const allClerkUsers = await clerkClient.users.getUserList({ limit: 100 });

  for (const cu of allClerkUsers) {
    const meta = cu.publicMetadata ?? {};

    // parse birthdate μόνο αν είναι string
    let birthdate: Date | null = null;
    if (typeof meta.birthdate === 'string' && meta.birthdate.trim() !== '') {
      const parsed = new Date(meta.birthdate);
      if (!isNaN(parsed.getTime())) {
        birthdate = parsed;
      }
    }

    const gender     = typeof meta.gender === 'string'     ? meta.gender     : null;
    const occupation = typeof meta.occupation === 'string' ? meta.occupation : null;
    const location   = typeof meta.location === 'string'   ? meta.location   : null;
    const isAdmin    = meta.isAdmin === true;

    // email fallback: πρώτα το emailAddresses[0], αλλιώς skip
    const firstEmailObj = Array.isArray(cu.emailAddresses) ? cu.emailAddresses[0] : undefined;
    const emailAddr = (firstEmailObj && firstEmailObj.emailAddress) || null;
    if (!emailAddr) {
      console.warn(`Παραλείπεται user ${cu.id}: δεν έχει έγκυρο email.`);
      continue;
    }

    // username fallback: είτε το cu.username, είτε το email, είτε το Clerk ID
    const username = typeof cu.username === 'string' && cu.username.trim() !== ''
      ? cu.username
      : emailAddr;

    // fullName fallback: πρώτα first+last, αλλιώς username
    const fullNameCandidate = `${cu.firstName ?? ''} ${cu.lastName ?? ''}`.trim();
    const fullName = fullNameCandidate !== '' ? fullNameCandidate : username;

    await prisma.user.upsert({
      where: { clerkId: cu.id },
      update: {
        fullName,
        username,
        email:      emailAddr,
        isAdmin,
        gender,
        birthdate,
        occupation,
        location,
      },
      create: {
        clerkId:   cu.id,
        fullName,
        username,
        password:  'CLERK_OAUTH', // dummy
        isAdmin,
        email:     emailAddr,
        gender,
        birthdate,
        occupation,
        location,
      },
    });
  }

  console.log(`✅ Εισήχθησαν/ενημερώθηκαν ${allClerkUsers.length} χρήστες.`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error('❌ Σφάλμα στο fetchClerkUsers.ts:', e);
  process.exit(1);
});
