import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthedNav = () => {
    return (
        <nav className="flex items-center justify-between mb-10">
            <Link href={"/"}>
                <a className="logo text-3xl">
                    <>Anony Sender</>
                </a>
            </Link>

            <div className="space-x-5">
                <button
                    className="btn-grad"
                    onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default AuthedNav;
