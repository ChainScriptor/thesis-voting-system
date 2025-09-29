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
        voting_type: 'public',
        userId: admin.id,
        target_occupation: null,
        target_location: null,
        birthdate_min: null,
        birthdate_max: null,
        target_gender: null,
        access_code: null,
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
        voting_type: 'private',
        userId: admin.id,
        target_occupation: null,
        target_location: null,
        birthdate_min: null,
        birthdate_max: null,
        target_gender: null,
        access_code: 'SPRING2025', // Κωδικός πρόσβασης για άνοιξη
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

  // 7. Δημιουργία περιορισμένης ψηφοφορίας (παράδειγμα)
  let election3 = await prisma.election.findFirst({
    where: { title: 'Εκλογές Φοιτητών 18-25' },
  })
  if (!election3) {
    election3 = await prisma.election.create({
      data: {
        title: 'Εκλογές Φοιτητών 18-25',
        description: 'Ψηφοφορία μόνο για φοιτητές ηλικίας 18-25 ετών',
        start_date: new Date('2025-03-01'),
        end_date: new Date('2025-03-15'),
        is_active: true,
        voting_type: 'restricted',
        userId: admin.id,
        target_occupation: 'Student',
        target_location: 'Athens',
        birthdate_min: new Date('2000-01-01'), // 25 ετών
        birthdate_max: new Date('2007-12-31'), // 18 ετών
        target_gender: 'all',
        access_code: null,
      },
    })
  }

  // 8. Συσχέτιση υποψηφίου με τρίτη εκλογή
  await prisma.takepart.upsert({
    where: {
      electionId_candidateId: {
        electionId: election3.id,
        candidateId: candidate.id,
      },
    },
    update: {},
    create: {
      electionId: election3.id,
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
