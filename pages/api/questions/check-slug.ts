import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/backend/utils/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await prisma.question.findUnique({
            select: {
                user: true
            },
            where: {
                id: req.body.questionId as string
            }
        })

        if (user?.user.slug === req.body.slug) {
            res.status(200).json({
                isValid: true
            })
        } else {
            res.status(200).json({
                isValid: false
            })
        }

    } catch (error) {
        console.error(error)
    }
}