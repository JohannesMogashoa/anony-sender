import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { setUserName } from "utils/api-calls";

const NewUserPage = () => {
    const { status } = useSession();
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setUserName(username)
            .then(() => {
                setUsername("");
                router.replace("/profile");
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (status == "unauthenticated") router.replace("/");
    }, [status]);

    return (
        <div className="h-screen p-10">
            <main className="flex flex-col items-center justify-center h-full">
                <h1 className="logo text-4xl mb-10">AnonySender</h1>
                <p className="text-white/60 mb-10 text-lg">
                    Welcome to AnonySender!!!!!! As you are a new user, we'd like you to pick your
                    username that will be associated with the URLs created.
                </p>

                <form onSubmit={(e) => handleSubmit(e)} className="w-full">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        min={5}
                        placeholder="Enter your username"
                        className="py-2 px-4 rounded-md bg-transparent border border-white/60 w-full block mb-2 outline-none text-white/60 placeholder-white/60"
                    />
                    <button type="submit" className="btn-grad w-full">
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
};

export default NewUserPage;
