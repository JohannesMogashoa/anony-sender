import AuthedNav from "@/components/AuthedNav";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageOptions, Question } from "@/utils/types";
import { getQuestions } from "@/utils/api_calls";
import ProfileCard from "@/components/ProfileCard";
import QuestionsSection from "@/components/QuestionsSection";

const Profile = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const router = useRouter();
    const { data, status } = useSession();

    const pageOptions: PageOptions = {
        title: "Profile | AnonySender",
        description: `${data?.user?.name}'s Profile Page`,
    };

    useEffect(() => {
        if (status == "unauthenticated") router.replace("/");

        getQuestions()
            .then((data) => {
                setQuestions(data);
            })
            .catch((error) => console.error(error));
    }, [status]);

    return (
        <Layout pageOptions={pageOptions}>
            <AuthedNav />
            <div className="flex flex-col md:flex-row md:space-x-10 flex-1 space-y-7 md:space-y-0">
                {/* Profile Outline and Question Creator */}
                <ProfileCard data={data} questions={questions} />

                {/* Cards showing all questions created by user */}
                <QuestionsSection questions={questions} />
            </div>
        </Layout>
    );
};

export default Profile;
