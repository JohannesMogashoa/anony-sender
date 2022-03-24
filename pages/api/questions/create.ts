import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })

        if (!session) res.status(403).json({
            message: "You are unauthorized. Please login to create a question"
        })

        const user = await prisma.user.findUnique({ select: { email: true }, where: { email: session?.user?.email! } })

        const question = await prisma.question.create({
            data: {
                question: req.body.question,
                email: user?.email!
            }
        })

        res.status(201).json(question)
    } catch (error) {

    }
}