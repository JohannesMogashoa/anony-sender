import { createRouter } from '@/backend/utils/createRouter';
import { getEmailOrThrow, questionRouter, getUserId } from '@/backend/routers/questionRouter';
import superjson from "superjson"
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { ServerUrl } from '../utils/url';

export const appRouter = createRouter()
    .transformer(superjson)
    .mutation('set-username', {
        input: z.object({
            username: z.string(),
        }),
        async resolve({ ctx, input }) {
            const email = getEmailOrThrow(ctx)

            await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    slug: input.username,
                },
            })

            return { success: true, message: "Username set successfully" }
        }
    })
    .query('get-share-url', {
        async resolve({ ctx }) {
            const userId = await getUserId(ctx)

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    slug: true,
                },
            });

            return `${ServerUrl}/${user?.slug}`
        }
    })
    .merge('question', questionRouter)
    .mutation('create-answer', {
        input: z.object({
            questionId: z.string().cuid(),
            answer: z.string()
        }),
        async resolve({ ctx, input }) {
            const answerInDb = await ctx.prisma!.answer.create({
                data: {
                    ...input
                }
            })

            return { success: true, answer: answerInDb }
        }
    })

// export type definition of API
export type AppRouter = typeof appRouter;