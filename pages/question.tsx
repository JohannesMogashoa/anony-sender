import AuthedNav from "@/components/AuthedNav";
import type { NextPage, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { getAnswers, getQuestion } from "@/utils/api_calls";
import Layout from "@/components/Layout";
import { Answer, Question } from "@/utils/types";
import ProfileCard from "@/components/ProfileCard";
import QuestionAnswers from "@/components/QuestionAnswers";

export async function getServerSideProps(context: NextPageContext) {
    const { id } = context.query;
    const question = await getQuestion(id as string);
    const answers = await getAnswers(question.id);

    if (answers.length > 0) {
        return {
            props: {
                question,
                answers,
            },
        };
    } else {
        return {
            props: {
                question,
            },
        };
    }
}

interface Props {
    question: Question;
    answers?: Answer[];
}

const QuestionPage = ({ question, answers }: Props) => {
    const { data } = useSession();

    const pageOptions = {
        title: `${question.question} | AnonySender`,
        description: `${question.question} created by ${data?.user?.name}`,
    };

    return (
        <Layout pageOptions={pageOptions}>
            <AuthedNav />
            <section className="flex flex-col md:flex-row md:space-x-10 flex-1 space-y-7 md:space-y-0">
                <ProfileCard data={data} />
                <QuestionAnswers question={question.question} answers={answers} />
            </section>
        </Layout>
    );
};

export default QuestionPage;
