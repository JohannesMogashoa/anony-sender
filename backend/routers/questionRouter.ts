import { Context } from "../utils/context";
import { createRouter } from "../utils/createRouter";
import { TRPCError } from "@trpc/server";
import { z } from 'zod';

const getEnmailOrThrow = (ctx: Context) => {
    const email = ctx.session?.user?.email;
    if (!email) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to perform this action',
        });
    }
    return email
}

export const questionRouter = createRouter()
    .query('get-questions-for-user', {
        async resolve({ ctx }) {
            const email = getEnmailOrThrow(ctx as Context)
            const user = await ctx.prisma!.user.findUnique({ select: { id: true }, where: { email } })
            const questions = await ctx.prisma!.question.findMany({
                select: { id: true, question: true, answers: true, createdAt: true, userId: true },
                where: {
                    archived: false,
                    userId: user?.id!
                }
            })
            return questions
        },
    })