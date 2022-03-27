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
                console.log(data);
                setQuestions(data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        if (status == "unauthenticated") router.replace("/");

        fetchQuestions();
    }, [status]);

    return (
        <main className="p-10 h-screen">
            <AuthedNav />

            <div className="flex flex-1 items-start">
                {/* Profile Outline and Question Creator */}
                <aside className="p-5 w-1/3 flex-1 border-2 border-white/60 rounded-md shadow-sm shadow-yellow-50 flex flex-col">
                    <div className="flex flex-col items-center mb-10">
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
                    <div className="flex justify-between text-white/60">
                        <p>Total Questions:</p>
                        <p>{questions.length}</p>
                    </div>
                    <div className="flex justify-between text-white/60">
                        <p>Total Responses:</p>
                        <p>{questions.length}</p>
                    </div>

                    <QuestionCreateForm />
                </aside>

                {/* Cards showing all questions created by user */}
                <section
                    className={
                        !questions.length
                            ? "w-2/3 p-5 min-h-full flex items-center justify-center"
                            : "w-2/3 p-5 min-h-full"
                    }>
                    {!questions.length ? (
                        <div className="w-1/2 text-white/60">
                            Unfortunately you have no questions.
                        </div>
                    ) : (
                        <div className="grid grid-cols-3">
                            {questions.map((question: any) => (
                                <a>
                                    <Link href={`/question?id=${question.id}`}>
                                        <div className="border-white/50 border-2 rounded-md p-5 cursor-pointer">
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
