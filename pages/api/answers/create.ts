import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        prisma.answer.create({
            data: {
                answer: req.body.answer,
                questionId: req.body.questionId
            }
        }).then((answer) => res.status(201).json({
            message: `Answer: ${answer.id} created successfullyn for question: ${answer.questionId}`
        })).catch(error => res.status(500).json(error))
    } catch (error) {
        console.log(error)
    }
}