import React from "react";
import { useFormik } from "formik";

const QuestionCreateFrom = () => {
    const questionForm = useFormik({
        initialValues: {
            question: "",
        },
        onSubmit: (values) => {
            fetch("/api/questions/create", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    questionForm.resetForm();
                })
                .catch((error) => console.error(error));
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
