import { Context } from "../utils/context";
import { createRouter } from "../utils/createRouter";
import { TRPCError } from "@trpc/server";
import { z } from 'zod';

export const getEmailOrThrow = (ctx: Context) => {
    const email = ctx.session?.user?.email;
    if (!email) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to perform this action',
        });
    }
    return email
}

const getUserId = async (ctx: Context) => {
    const email = getEmailOrThrow(ctx);
    const user = await ctx.prisma!.user.findUnique({ select: { id: true }, where: { email } })

    return user?.id

}

export const questionRouter = createRouter()
    .mutation('create-question', {
        input: z.object({
            userId: z.string().cuid(),
            question: z.string()
        }),
        async resolve({ ctx, input }) {
            const questionInDb = await ctx.prisma!.question.create({
                data: {
                    ...input
                }
            })

            return { success: true, question: questionInDb }
        }
    })
    .query('get-questions-for-user', {
        async resolve({ ctx }) {
            // const email = getEmailOrThrow(ctx)
            // const user = await ctx.prisma!.user.findUnique({ select: { id: true }, where: { email } })
            const userId = await getUserId(ctx)
            const questions = await ctx.prisma!.question.findMany({
                select: { id: true, question: true, answers: true, createdAt: true, userId: true },
                where: {
                    archived: false,
                    userId
                }
            })
            return questions
        },
    })
    .query('get-question-by-id', {
        input: z.object({
            id: z.string().cuid(),
            slug: z.string()
        }),
        async resolve({ ctx, input }) {
            const user = await ctx.prisma!.question.findUnique({
                select: {
                    user: true
                },
                where: {
                    id: input.id,
                }
            })

            if (user?.user.slug === input.slug) {
                const question = await ctx.prisma!.question.findUnique({
                    where: {
                        id: input.id
                    }
                })

                return { success: true, question }
            } else {
                return { success: false, message: 'Invalid slug' }
            }
        }
    })
    .query('get-question-by-id-with-answers', {
        input: z.object({
            id: z.string().cuid()
        }),
        async resolve({ ctx, input }) {
            const question = await ctx.prisma!.question.findUnique({
                where: {
                    id: input.id
                },
                include: {
                    answers: true
                }
            })
            return question
        }
    })