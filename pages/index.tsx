import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Anony Sender</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="w-screen h-screen flex items-center justify-center">
                <button onClick={() => signIn("google", { callbackUrl: "/profile" })}>
                    Sign In
                </button>
            </main>
        </div>
    );
};

export default Home;
