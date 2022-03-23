import AuthedNav from "@/components/AuthedNav";
import QuestionCreateFrom from "@/components/QuestionCreateFrom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Profile = () => {
    const [showForm, setShowForm] = useState(false);
    const [questions, setQuestions] = useState([]);
    const router = useRouter();
    const { data, status } = useSession();

    useEffect(() => {
        if (status == "unauthenticated") router.replace("/");
    }, [status]);

    return (
        <main className="p-10 min-h-screen">
            <AuthedNav setShowForm={setShowForm} />

            <div className="flex flex-1">
                <aside className="p-5 w-1/4 flex-1 border-2 rounded-md shadow-sm shadow-yellow-50 flex flex-col">
                    <h2 className="text-2xl font-semibold text-white mb-10 text-center">
                        Profile Information
                    </h2>
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
                </aside>

                <section
                    className={
                        !questions.length
                            ? "w-3/4 p-5 min-h-full flex items-center justify-center"
                            : ""
                    }>
                    {!questions.length ? (
                        <div className="w-1/2 text-white/60">
                            Unfortunately you have no questions. Please go ahead and create by
                            clicking "Add New" button.
                        </div>
                    ) : (
                        <div></div>
                    )}
                </section>
            </div>

            {/* {showForm ? (
                QuestionCreateFrom
            ) : (
                <button onClick={() => setShowForm(true)}>Create New Question</button>
            )} */}
        </main>
    );
};

export default Profile;
