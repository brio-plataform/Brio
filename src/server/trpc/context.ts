import { inferAsyncReturnType } from '@trpc/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import type { Context as ContextType } from './types';

export async function createContext(): Promise<ContextType> {
  const session = await getServerSession(authOptions);

  return {
    session,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 