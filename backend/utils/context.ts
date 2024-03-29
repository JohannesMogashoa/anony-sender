import { getSession } from "next-auth/react";
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { IncomingMessage } from 'http';
import ws from 'ws';
import { prisma } from "./prisma";

// console.log('createContext for', session?.user?.name ?? 'unknown user');
export const createContext = async ({
    req,
    res,
}:
    | trpcNext.CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
    const session = await getSession({ req });
    return {
        req,
        res,
        prisma,
        session,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;