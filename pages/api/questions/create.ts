import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/backend/utils/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })

        if (!session) res.status(403).json({
            message: "You are unauthorized. Please login to create a question"
        })

        const userId = await prisma.user.findUnique({
            select: { id: true },
            where: {
                email: session?.user?.email!
            }
        })

        prisma.question.create({
            data: {
                userId: userId?.id!,
                question: req.body.question
            }
        }).then((question) => res.status(201).json({
            message: `Question: ${question.id} created successfully`
        })).catch(error => res.status(500).json(error))


    } catch (error) {
        console.log(error)
    }
}