import { Answer } from "@/utils/types";

interface Props {
    question: string;
    answers?: Answer[];
}
const QuestionAnswers = ({ question, answers }: Props) => {
    return (
        <main className="p-5 h-[75vh] w-full md:w-2/3 border-2 border-white/60 rounded-md shadow-inner flex flex-col">
            <div>
                <h1 className="text-3xl italic text-white/50 mb-5 text-center">{question}</h1>
                <p className="italic mb-4 text-white">
                    Responses: {answers?.length ? answers.length : 0}
                </p>
                <div className="max-h-[570px] md:max-h-[300px] overflow-hidden overflow-y-scroll hide_scrollbar">
                    {answers &&
                        answers?.map((answer: Answer) => (
                            <div key={answer.id} className="bg-white/20 p-3 rounded-md mb-3">
                                <p className="text-white/75">{answer.answer}</p>
                            </div>
                        ))}
                </div>
            </div>
        </main>
    );
};

export default QuestionAnswers;
