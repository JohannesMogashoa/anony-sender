import AuthedNav from "@/components/AuthedNav";
import QuestionCreateForm from "@/components/QuestionCreateForm";
import type { NextPage, NextPageContext } from "next";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/questions/${id}`);
    const question = await res.json();

    return {
        props: {
            question,
        },
    };
}

const QuestionPage: NextPage = ({ question }: any | null) => {
    const { data } = useSession();
    return (
        <div className="p-10">
            <AuthedNav />
            <section className="flex">
                <aside className="p-5 w-1/3 border-2 border-white/60 rounded-md shadow-sm shadow-yellow-50 flex flex-col">
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

                    <QuestionCreateForm />
                </aside>
                <main></main>
            </section>
        </div>
    );
};

export default QuestionPage;
