import { signOut } from "next-auth/react";
import React from "react";

const AuthedNav = () => {
    return (
        <nav className="flex items-center justify-between mb-10">
            <h1 className="logo text-3xl">Anony Sender</h1>
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
