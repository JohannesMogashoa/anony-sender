import { Question } from "@/utils/types";
import Link from "next/link";

interface Props {
    question: Question;
}

const QuestionCard = ({ question }: Props) => {
    return (
        <Link href={`/question?id=${question.id}`}>
            <a className="border-white/50 border-2 rounded-md p-5 cursor-pointer h-full">
                <p className="text-white font-semibold">{question.question}</p>
                <p className="text-sm text-slate-300 font-serif">
                    {new Date(question.createdAt).toLocaleDateString()}
                </p>
            </a>
        </Link>
    );
};

export default QuestionCard;
