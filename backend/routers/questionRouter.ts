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
            question: z.string()
        }),
        async resolve({ ctx, input }) {
            const userId = await getUserId(ctx)

            if (!userId) return;

            const questionInDb = await ctx.prisma!.question.create({
                data: {
                    userId,
                    question: input.question
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
                select: { id: true, question: true, createdAt: true, userId: true, archived: true },
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
        }),
        async resolve({ ctx, input }) {

            const question = await ctx.prisma!.question.findUnique({
                where: {
                    id: input.id
                }
            })

            if (!question) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Question not found',
                });
            } else {
                return question
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