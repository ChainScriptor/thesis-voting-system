// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  // 1. Δημιουργία ή λήψη admin χρήστη
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      clerkId: uuidv4(),                 // Yποχρεωτικό πεδίο Clerk
      fullName: 'Admin User',
      username: 'admin',
      password: 'admin123', // Θα κρυπτογραφηθεί σε πραγματικό σύστημα
      isAdmin: true,
      gender: 'male',
      email: 'admin@example.com',
      birthdate: new Date('1990-01-01'),
      occupation: 'Developer',
      location: 'Athens',
    },
  })

  // 2. Δημιουργία ή λήψη υποψηφίου
  let candidate = await prisma.candidate.findFirst({
    where: { name: 'John Doe' },
  })
  if (!candidate) {
    candidate = await prisma.candidate.create({
      data: {
        name: 'John Doe',
        description: 'Πρώτος υποψήφιος',
        image: 'https://via.placeholder.com/150',
        is_person: true,
      },
    })
  }

  // 3. Δημιουργία ή λήψη πρώτης εκλογής
  let election1 = await prisma.election.findFirst({
    where: { title: 'Demo Εκλογές' },
  })
  if (!election1) {
    election1 = await prisma.election.create({
      data: {
        title: 'Demo Εκλογές',
        description: 'Αυτή είναι μια δοκιμαστική εκλογική διαδικασία',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-01-10'),
        is_active: true,
        userId: admin.id,
        target_occupation: 'Developer',
        target_location: 'Athens',
        birthdate_min: new Date('1980-01-01'),
        birthdate_max: new Date('2005-01-01'),
        target_gender: 'male',
      },
    })
  }

  // 4. Συσχέτιση υποψηφίου με πρώτη εκλογή
  await prisma.takepart.upsert({
    where: {
      electionId_candidateId: {
        electionId: election1.id,
        candidateId: candidate.id,
      },
    },
    update: {},
    create: {
      electionId: election1.id,
      candidateId: candidate.id,
      numberOfVotes: 0,
    },
  })

  // 5. Δημιουργία ή λήψη δεύτερης εκλογής
  let election2 = await prisma.election.findFirst({
    where: { title: 'Εκλογές Άνοιξης 2025' },
  })
  if (!election2) {
    election2 = await prisma.election.create({
      data: {
        title: 'Εκλογές Άνοιξης 2025',
        description: 'Ψηφοφορία για την επιλογή της καλύτερης άνοιξης δραστηριότητας',
        start_date: new Date('2025-04-15'),
        end_date: new Date('2025-04-30'),
        is_active: true,
        userId: admin.id,
        target_occupation: 'Student',
        target_location: 'Thessaloniki',
        birthdate_min: new Date('1998-01-01'),
        birthdate_max: new Date('2006-12-31'),
        target_gender: 'all',
      },
    })
  }

  // 6. Συσχέτιση υποψηφίου με δεύτερη εκλογή
  await prisma.takepart.upsert({
    where: {
      electionId_candidateId: {
        electionId: election2.id,
        candidateId: candidate.id,
      },
    },
    update: {},
    create: {
      electionId: election2.id,
      candidateId: candidate.id,
      numberOfVotes: 0,
    },
  })
}

main()
  .then(async () => {
    console.log('✅ Seed ολοκληρώθηκε με επιτυχία.')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Σφάλμα κατά το seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
