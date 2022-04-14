import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/backend/utils/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })

        if (!session) res.status(403).json({
            message: "You are unauthorized to perform this"
        })

        const user = await prisma.user.findUnique({ select: { id: true }, where: { email: session?.user?.email! } })

        prisma.question.findMany({
            select: { id: true, question: true, answers: true, createdAt: true, userId: true },
            where: {
                archived: false,
                userId: user?.id!
            }
        })
            .then(questions => res.status(200).json(questions))
            .catch(error => res.status(500).json({ message: error }))

    } catch (error) {
        res.status(500).json(error)
    }
}