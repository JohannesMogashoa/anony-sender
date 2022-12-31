import { Question } from "@/utils/types";
import Link from "next/link";
import { RWebShare } from "react-web-share";
import { trpc } from "@/utils/trpc";
interface Props {
    question: Question;
}

const QuestionCard = ({ question }: Props) => {
    const { data } = trpc.useQuery(["get-share-url"]);

    return (
        <div className="relative h-full p-5 border-2 rounded-md cursor-pointer border-white/50">
            <Link href={`/question?id=${question.id}`}>
                <a>
                    <p className="font-semibold text-white">{question.question}</p>
                    <p className="font-serif text-sm text-slate-300">
                        {new Date(question.createdAt).toLocaleDateString()}
                    </p>
                </a>
            </Link>
            <RWebShare
                data={{
                    url: `${data}/${question.id}`,
                    title: `${question.question.substring(0, question.question.length / 2)}...`,
                    text: question.question,
                }}>
                <span className="absolute p-2 rounded-full right-4 bottom-4 bg-white/30">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 text-white">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                        />
                    </svg>
                </span>
            </RWebShare>
        </div>
    );
};

export default QuestionCard;
