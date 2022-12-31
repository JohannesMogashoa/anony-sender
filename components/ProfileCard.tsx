import { Question } from "@/utils/types";
import { Session } from "next-auth";
import QuestionCreateForm from "./QuestionCreateForm";

interface Props {
    data: Session | null;
    questions?: Question[];
}

const ProfileCard = ({ data, questions }: Props) => {
    return (
        <aside className="p-5 md:w-1/3 flex-1 border-2 border-white/60 rounded-md shadow-sm shadow-yellow-50 flex flex-col">
            <div className="flex flex-col items-center mb-3 md:mb-10">
                <img src={data?.user?.image!} alt="Profile Photo" className="rounded-full w-1/3" />
                <h5 className="text-lg font-semibold text-white my-3">{data?.user?.name}</h5>
                <p className="text-white text-sm">{data?.user?.email}</p>
            </div>
            {questions && (
                <>
                    <div className="hidden md:flex justify-between text-white/60">
                        <p>Total Questions:</p>
                        <p>{questions.length}</p>
                    </div>
                </>
            )}

            <QuestionCreateForm />
        </aside>
    );
};

export default ProfileCard;
