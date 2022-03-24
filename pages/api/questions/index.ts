import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })

        if (!session) res.status(403).json({
            message: "You are unauthorized to perform this"
        })

        const userEmail = await prisma.user.findUnique({ select: { email: true }, where: { email: session?.user?.email! } })

        const questions = await prisma.question.findMany({
            select: { question: true, answers: true, createdAt: true },
            where: {
                archived: false,
                email: userEmail?.email!
            }
        })

        console.log(questions)

        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json(error)
    }
}