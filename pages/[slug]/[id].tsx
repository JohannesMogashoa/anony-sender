import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { IncomingMessage, ServerResponse } from "http";
import { createAnswer, getQuestion, verifySlug } from "@/utils/api_calls";
import { Question } from "@/utils/types";

interface ServerSideProps {
    req: IncomingMessage | undefined;
    res: ServerResponse | undefined;
    resolvedUrl: string | undefined;
}

interface Props {
    question: Question;
    slug?: string;
}

export async function getServerSideProps({ req, res, resolvedUrl }: ServerSideProps) {
    const slug = resolvedUrl?.split("/")[1];
    const questionId = resolvedUrl?.split("/")[2];

    const { isValid } = await verifySlug(slug!, questionId!);

    if (isValid) {
        const question = await getQuestion(questionId!);
        return {
            props: {
                question,
                slug,
            },
        };
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: true,
            },
        };
    }
}

const QuestionResponse = ({ question, slug }: Props) => {
    const [haveAnswered, setHaveAnswered] = useState(false);

    useEffect(() => {
        if (
            localStorage.getItem("questionId") &&
            localStorage.getItem("questionId") === question.id
        ) {
            setHaveAnswered(true);
        }
    }, []);

    const answerForm = useFormik({
        initialValues: {
            questionAnswer: "",
        },
        onSubmit: (values) => {
            createAnswer(values.questionAnswer, question.id)
                .then(() => {
                    localStorage.setItem("questionId", question.id);
                    answerForm.resetForm();
                    window.location.reload();
                })
                .catch((error) => console.error(error));
        },
    });

    return (
        <div className="p-10 h-screen">
            <Head>
                <title>{slug?.toUpperCase()} Question</title>
            </Head>
            <main className="flex flex-col items-center justify-center h-full">
                <h1 className="logo text-4xl mb-10">AnonySender</h1>
                <section className="bg-white/20 p-10 rounded-md">
                    <h1 className="text-3xl italic text-white/50 mb-5 text-center">
                        {question?.question}
                    </h1>
                    {haveAnswered && (
                        <p className="text-xs text-center mb-3 font-bold">
                            You have already answered this question
                        </p>
                    )}
                    <form onSubmit={answerForm.handleSubmit}>
                        <input
                            type="text"
                            name="questionAnswer"
                            id="questionAnswer"
                            maxLength={120}
                            minLength={5}
                            value={answerForm.values.questionAnswer}
                            onChange={answerForm.handleChange}
                            required
                            disabled={haveAnswered}
                            className="py-2 px-4 rounded-md bg-transparent border border-white/60 w-full block mb-2 outline-none text-white/60 placeholder-white/60"
                        />
                        <input
                            type="submit"
                            value="Submit Answer"
                            disabled={haveAnswered}
                            className="btn-grad w-full"
                        />
                    </form>
                </section>
            </main>
        </div>
    );
};

export default QuestionResponse;
