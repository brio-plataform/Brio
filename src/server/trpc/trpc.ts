import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';
import { prisma } from '@/lib/prisma';
import type { Context as ContextType } from './types';

const t = initTRPC.context<ContextType>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: ctx.session,
      prisma,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed); 