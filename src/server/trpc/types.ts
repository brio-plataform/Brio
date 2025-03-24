import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';

export interface Context {
  session: Session | null;
  prisma: PrismaClient;
} 