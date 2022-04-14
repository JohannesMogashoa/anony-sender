import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/backend/utils/prisma";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    theme: {
        colorScheme: "light",
        brandColor: "#ba38f6"
    },
    pages: {
        newUser: "/new-user",
    },
    debug: true,
    secret: process.env.AUTH_SECRET
})
