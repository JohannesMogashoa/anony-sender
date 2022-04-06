import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const answers = await prisma.answer.findMany({ where: { questionId: req.query.questionId as string } })

    if (!answers || !answers.length) res.status(500).json({
        error: "Oops! Something went wrong"
    })

    return res.status(200).json(answers)
}