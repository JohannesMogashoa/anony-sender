import AuthedNav from "@/components/AuthedNav";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageOptions, Question } from "@/utils/types";
import { getQuestions } from "@/utils/api_calls";
import ProfileCard from "@/components/ProfileCard";
import QuestionsSection from "@/components/QuestionsSection";
import { trpc } from "@/utils/trpc";

const Profile = () => {
    const { data: questions, isFetching } = trpc.useQuery(["questionget-questions-for-user"]);
    const router = useRouter();
    const { data, status } = useSession();

    const pageOptions: PageOptions = {
        title: "Profile | AnonySender",
        description: `${data?.user?.name}'s Profile Page`,
    };

    useEffect(() => {
        if (status == "unauthenticated") router.replace("/");
    }, [status]);

    return (
        <Layout pageOptions={pageOptions}>
            <AuthedNav />
            {isFetching ? (
                <>
                    <h1 className="flex items-center justify-center text-white/50 text-3xl flex-1 h-full">
                        Data is still being fetched
                    </h1>
                </>
            ) : (
                questions && (
                    <div className="flex flex-col md:flex-row md:space-x-10 flex-1 space-y-7 md:space-y-0">
                        <ProfileCard data={data} questions={questions} />
                        <QuestionsSection questions={questions} />
                    </div>
                )
            )}
        </Layout>
    );
};

export default Profile;
