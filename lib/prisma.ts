// lib/prisma.ts

import { PrismaClient } from '../src/generated/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Καθαρισμός της σύνδεσης όταν η εφαρμογή κλείνει
const cleanup = async () => {
  await prisma.$disconnect()
}

if (typeof process !== 'undefined') {
  process.on('beforeExit', cleanup)
  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)
}

export default prisma
