import AuthedNav from "@/components/AuthedNav";
import type { NextPageContext } from "next";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import ProfileCard from "@/components/ProfileCard";
import QuestionAnswers from "@/components/QuestionAnswers";
import { trpc } from "@/utils/trpc";

export async function getServerSideProps(context: NextPageContext) {
    const { id } = context.query;

    return {
        props: {
            questionId: id,
        },
    };
}

interface Props {
    questionId: string;
}

const QuestionPage = ({ questionId }: Props) => {
    const { data } = useSession();

    const { data: dbData } = trpc.useQuery([
        "questionget-question-by-id-with-answers",
        { id: questionId },
    ]);

    const pageOptions = {
        title: `${dbData?.question} | AnonySender`,
        description: `${dbData?.question} created by ${data?.user?.name}`,
    };

    return (
        <Layout pageOptions={pageOptions}>
            <AuthedNav />
            <section className="flex flex-col flex-1 md:flex-row md:space-x-10 space-y-7 md:space-y-0">
                <ProfileCard data={data} />
                {dbData && <QuestionAnswers question={dbData.question} answers={dbData.answers} />}
            </section>
        </Layout>
    );
};

export default QuestionPage;
