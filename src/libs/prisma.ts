// lib/prisma.ts
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// This prevents the Prisma Client from being instantiated multiple times in development
// and creates a new client instance for every request in production.
// This is important for performance and memory management.