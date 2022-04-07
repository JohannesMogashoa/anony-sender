import { Question } from "@/utils/types";
import QuestionCard from "./QuestionCard";

interface Props {
    questions: Question[];
}

const QuestionsSection = ({ questions }: Props) => {
    return (
        <section
            className={
                !questions.length
                    ? "sm:w-full md:w-2/3 flex items-center justify-center"
                    : "w-full md:w-2/3 max-h-96 md:max-h-[450px] overflow-hidden overflow-y-scroll py-5 md:py-0 mb-3 md:mb-0 hide_scrollbar"
            }>
            {!questions.length ? (
                <div className="w-1/2 text-white/60">Unfortunately you have no questions.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {questions.map((question: Question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default QuestionsSection;
