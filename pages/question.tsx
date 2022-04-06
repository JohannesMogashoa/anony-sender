import AuthedNav from "@/components/AuthedNav";
import QuestionCreateForm from "@/components/QuestionCreateForm";
import type { NextPage, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { getAnswers, getQuestion } from "utils/api-calls";

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

const QuestionPage: NextPage = ({ question, answers }: any | null) => {
    const { data } = useSession();
    return (
        <div className="p-10 h-screen overflow-hidden">
            <AuthedNav />
            <section className="flex flex-col md:flex-row md:space-x-10 flex-1 space-y-7 md:space-y-0">
                <aside className="p-5 md:w-1/3  border-2 border-white/60 rounded-md shadow-sm shadow-yellow-50 hidden md:flex flex-col flex-1">
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
                <main className="p-5 h-[75vh] w-full md:w-2/3 border-2 border-white/60 rounded-md shadow-inner flex flex-col">
                    <div>
                        <h1 className="text-3xl italic text-white/50 mb-5 text-center">
                            {question.question}
                        </h1>
                        <p className="italic mb-4 text-white">
                            Responses: {answers?.length ? answers.length : 0}
                        </p>
                        <div className="max-h-[570px] md:max-h-[300px] overflow-hidden overflow-y-scroll hide_scrollbar">
                            {answers &&
                                answers?.map((answer: any) => (
                                    <div className="bg-white/20 p-3 rounded-md mb-3">
                                        <p className="text-white/75">{answer.answer}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default QuestionPage;
