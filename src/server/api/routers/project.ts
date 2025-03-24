import { z } from 'zod';
import { router, protectedProcedure } from '../../trpc/trpc';
import type { Context } from '../../trpc/types';

const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  model: z.string().default('article'),
  visibility: z.string().default('public'),
  progress: z.number().default(0),
  status: z.string().default('Em Andamento'),
  tags: z.array(z.string()).default([]),
});

export const projectRouter = router({
  create: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }: { ctx: Context; input: z.infer<typeof projectSchema> }) => {
      if (!ctx.session?.user?.id) {
        throw new Error('User not authenticated');
      }

      const project = await ctx.prisma.project.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });

      return project;
    }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }: { ctx: Context; input: string }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { id: input },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      return project;
    }),

  getAll: protectedProcedure
    .query(async ({ ctx }: { ctx: Context }) => {
      if (!ctx.session?.user?.id) {
        throw new Error('User not authenticated');
      }

      const projects = await ctx.prisma.project.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: 'desc' },
      });

      return projects;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        logo: z.string().optional(),
        banner: z.string().optional(),
        model: z.string().optional(),
        visibility: z.string().optional(),
        progress: z.number().optional(),
        status: z.string().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }: { ctx: Context; input: { id: string } & Partial<z.infer<typeof projectSchema>> }) => {
      const { id, ...updateData } = input;

      const project = await ctx.prisma.project.update({
        where: { id },
        data: updateData,
      });

      return project;
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }: { ctx: Context; input: string }) => {
      await ctx.prisma.project.delete({
        where: { id: input },
      });

      return { success: true };
    }),
}); 