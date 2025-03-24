import { z } from 'zod';
import { router, protectedProcedure } from '../../trpc/trpc';
import bcrypt from 'bcryptjs';
import type { Context } from '../../trpc/types';

const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const userRouter = router({
  create: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }: { ctx: Context; input: z.infer<typeof userSchema> }) => {
      const { password, ...userData } = input;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }: { ctx: Context; input: string }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ ctx, input }: { ctx: Context; input: { id: string; name?: string; email?: string } }) => {
      const { id, ...updateData } = input;

      const user = await ctx.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          updatedAt: true,
        },
      });

      return user;
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }: { ctx: Context; input: string }) => {
      await ctx.prisma.user.delete({
        where: { id: input },
      });

      return { success: true };
    }),
}); 