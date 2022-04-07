import Layout from "@/components/Layout";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageOptions } from "utils/types";

const Home: NextPage = () => {
    const { status } = useSession();
    const router = useRouter();
    const pageOptions: PageOptions = {
        title: "Welcome to AnonySender",
        description:
            "Anonymously receive messages and responses to your questions from your friends and family.",
    };

    useEffect(() => {
        if (status == "authenticated") router.replace("/profile");
    }, [status]);

    return (
        <Layout pageOptions={pageOptions}>
            <div className="h-full flex flex-col items-center justify-center">
                <h1 className="logo text-3xl mb-5">Anony Sender</h1>
                <p className="w-1/2 mb-3 text-white/60">
                    Are you looking to ask your friends a question and not know who said what? Then
                    you have come to the right place.
                </p>
                <p className="w-1/2 mb-10 text-white/60">
                    Anony Sender caters for that very need of posing a question to your mates and
                    having them being at peace knowing that they will not be completely ANONYMOUS!
                </p>
                <button
                    className="btn-grad"
                    onClick={() => signIn("google", { callbackUrl: "/profile" })}>
                    Continue with Google
                </button>
            </div>
        </Layout>
    );
};

export default Home;
