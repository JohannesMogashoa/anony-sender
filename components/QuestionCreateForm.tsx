import React from "react";
import { useFormik } from "formik";
import { trpc } from "@/utils/trpc";

const QuestionCreateFrom = () => {
    const createQuestion = trpc.useMutation("questioncreate-question");

    const questionForm = useFormik({
        initialValues: {
            question: "",
        },
        onSubmit: (values) => {
            createQuestion.mutate({ question: values.question });
            questionForm.resetForm();
            window.location.reload();
        },
    });
    return (
        <form onSubmit={questionForm.handleSubmit} className="my-5">
            <input
                type="text"
                placeholder="Enter Question"
                id="question"
                name="question"
                value={questionForm.values.question}
                onChange={questionForm.handleChange}
                className="py-2 px-4 rounded-md bg-transparent border border-white/60 w-full block mb-2 outline-none text-white/60 placeholder-white/60"
            />
            <input type="submit" value="Create" className="btn-grad w-full" />
        </form>
    );
};

export default QuestionCreateFrom;
