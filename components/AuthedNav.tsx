import { signOut } from "next-auth/react";
import Link from "next/link";

const AuthedNav = () => {
    return (
        <nav className="flex items-center justify-between mb-10">
            <Link href={"/"}>
                <a className="text-2xl logo md:text-3xl">
                    <>Anony Sender</>
                </a>
            </Link>

            <div className="space-x-5">
                <button
                    className="text-white"
                    onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default AuthedNav;
