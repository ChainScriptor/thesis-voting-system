// lib/prisma.ts

import { PrismaClient } from '../src/generated/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
