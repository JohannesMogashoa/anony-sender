import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { IncomingMessage, ServerResponse } from "http";
import { trpc } from "@/utils/trpc";
import { ServerUrl } from "@/backend/utils/url";

interface ServerSideProps {
    req: IncomingMessage | undefined;
    res: ServerResponse | undefined;
    resolvedUrl: string | undefined;
}
interface Props {
    questionId: string;
    slug?: string;
}

const verifySlug: (slug: string, questionId: string) => Promise<{ isValid: boolean }> = async (
    slug: string,
    questionId: string,
) => {
    const response = await fetch(`${ServerUrl}/api/check-slug`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            slug,
            questionId,
        }),
    });
    return response.json();
};

export async function getServerSideProps({ req, res, resolvedUrl }: ServerSideProps) {
    const slug = resolvedUrl?.split("/")[1];
    const questionId = resolvedUrl?.split("/")[2];

    const { isValid } = await verifySlug(slug!, questionId!);

    if (isValid) {
        return {
            props: {
                questionId,
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

const QuestionResponse = ({ questionId, slug }: Props) => {
    const [haveAnswered, setHaveAnswered] = useState(false);
    const createAnswerMutation = trpc.useMutation("create-answer");

    useEffect(() => {
        if (
            localStorage.getItem("questionId") &&
            localStorage.getItem("questionId") === questionId
        ) {
            setHaveAnswered(true);
        }
    }, []);

    const { data: question } = trpc.useQuery(["questionget-question-by-id", { id: questionId }]);

    const answerForm = useFormik({
        initialValues: {
            questionAnswer: "",
        },
        onSubmit: (values) => {
            if (!question) return;

            createAnswerMutation
                .mutateAsync({ answer: values.questionAnswer, questionId })
                .then((res) => {
                    if (res.success) {
                        localStorage.setItem("questionId", question.id);
                        answerForm.resetForm();
                        window.location.reload();
                    }
                })
                .catch((err) => console.log(err));
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
