import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })

        if (!session) res.status(403).json({
            message: "You are unauthorized. Please login to create a question"
        })

        prisma.user.update({
            where: {
                email: session?.user?.email!,
            },
            data: {
                slug: req.body.username,
            },
        }).then(() => {
            res.status(200).json({
                message: "Username set successfully"
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error setting username",
                error: err
            })
        })

    } catch (error) {
        console.log(error)
    }
}