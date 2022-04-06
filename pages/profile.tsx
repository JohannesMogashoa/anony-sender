import AuthedNav from "@/components/AuthedNav";
import QuestionCreateForm from "@/components/QuestionCreateForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Profile = () => {
    const [questions, setQuestions] = useState([]);
    const router = useRouter();
    const { data, status } = useSession();

    const fetchQuestions = () => {
        fetch("/api/questions")
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        if (status == "unauthenticated") router.replace("/");

        fetchQuestions();
    }, [status]);

    return (
        <main className="p-10 h-screen overflow-hidden">
            <AuthedNav />

            <div className="flex flex-col md:flex-row md:space-x-10 flex-1 space-y-7 md:space-y-0">
                {/* Profile Outline and Question Creator */}
                <aside className="p-5 md:w-1/3 flex-1 border-2 border-white/60 rounded-md shadow-sm shadow-yellow-50 flex flex-col">
                    <div className="flex flex-col items-center mb-3 md:mb-10">
                        <img
                            src={data?.user?.image!}
                            alt="Profile Photo"
                            className="rounded-full w-1/3"
                        />
                        <h5 className="text-lg font-semibold text-white my-3">
                            {data?.user?.name}
                        </h5>
                        <p className="text-white text-sm">{data?.user?.email}</p>
                    </div>
                    <div className="hidden md:flex justify-between text-white/60">
                        <p>Total Questions:</p>
                        <p>{questions.length}</p>
                    </div>
                    <div className="hidden md:flex justify-between text-white/60">
                        <p>Total Responses:</p>
                        <p>{questions.length}</p>
                    </div>

                    <QuestionCreateForm />
                </aside>

                {/* Cards showing all questions created by user */}
                <section
                    className={
                        !questions.length
                            ? "sm:w-full md:w-2/3 flex items-center justify-center"
                            : "w-full md:w-2/3 max-h-96 md:max-h-[450px] overflow-hidden overflow-y-scroll py-5 md:py-0 mb-3 md:mb-0 hide_scrollbar"
                    }>
                    {!questions.length ? (
                        <div className="w-1/2 text-white/60">
                            Unfortunately you have no questions.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {questions.map((question: any) => (
                                <a key={question.id}>
                                    <Link href={`/question?id=${question.id}`}>
                                        <div className="border-white/50 border-2 rounded-md p-5 cursor-pointer h-full">
                                            <p className="text-white font-semibold">
                                                {question.question}
                                            </p>
                                            <p className="text-sm text-slate-300 font-serif">
                                                {new Date(question.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Profile;
