import AuthedNav from "@/components/AuthedNav";
import QuestionCreateForm from "@/components/QuestionCreateForm";
import type { NextPage, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { getAnswers, getQuestion } from "utils/api-calls";

export async function getServerSideProps(context: NextPageContext) {
    const { id } = context.query;
    const question = await getQuestion(id as string);
    const answers = await getAnswers(question.id);

    return {
        props: {
            question,
            answers,
        },
    };
}

const QuestionPage: NextPage = ({ question, answers }: any | null) => {
    const { data } = useSession();
    return (
        <div className="p-10">
            <AuthedNav />
            <section className="flex space-x-5">
                <aside className="p-5 w-1/3 border-2 border-white/60 rounded-md shadow-sm shadow-yellow-50 flex flex-col">
                    <div className="flex flex-col items-center mb-10">
                        <img
                            src={data?.user?.image!}
                            alt="Profile Photo"
                            className="rounded-full w-1/3"
                        />
                        <h5 className="text-lg font-semibold text-white my-3">
                            {data?.user?.name}
                        </h5>
                        <p className="text-white text-sm">{data?.user?.email}</p>
                    </div>
                    <QuestionCreateForm />
                </aside>
                <main className="p-5 w-2/3 border-2 border-white/60 rounded-md shadow-inner flex flex-col">
                    <div>
                        <h1 className="text-3xl italic text-white/50 mb-5 text-center">
                            {question.question}
                        </h1>
                        <p className="italic mb-4 text-white">Responses: {answers?.length}</p>
                        {answers?.map((answer: any) => (
                            <div className="bg-white/20 p-3 rounded-md mb-3">
                                <p className="text-white/75">{answer.answer}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </section>
        </div>
    );
};

export default QuestionPage;
