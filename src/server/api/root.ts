import { router } from '../trpc/trpc';
import { userRouter } from './routers/user';
import { projectRouter } from './routers/project';

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
  // Aqui serão adicionados os routers específicos
});

export type AppRouter = typeof appRouter; 