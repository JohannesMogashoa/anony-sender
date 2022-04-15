import { createRouter } from '@/backend/utils/createRouter';
import { questionRouter } from '@/backend/routers/questionRouter';
import superjson from "superjson"

export const appRouter = createRouter().transformer(superjson).merge('question', questionRouter)

// export type definition of API
export type AppRouter = typeof appRouter;