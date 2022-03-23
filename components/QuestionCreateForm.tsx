import React from "react";

const QuestionCreateFrom = () => {
    return (
        <form className="my-5">
            <input
                type="text"
                placeholder="Enter Question"
                className="py-2 px-4 rounded-md bg-transparent border border-white/60 w-full block mb-2 outline-none text-white/60 placeholder-white/60"
            />
            <input type="submit" value="Create" className="btn-grad w-full" />
        </form>
    );
};

export default QuestionCreateFrom;
