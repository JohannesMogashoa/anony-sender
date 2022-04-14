import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/backend/utils/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const question = await prisma.question.findUnique({ where: { id: req.query.id as string } })
    if (!question) res.status(500).json({
        error: "Oops! Something went wrong"
    })

    return res.status(200).json(question)
}