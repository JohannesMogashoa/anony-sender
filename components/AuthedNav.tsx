import { signOut } from "next-auth/react";
import React from "react";

const AuthedNav = ({ setShowForm }: any) => {
    return (
        <nav className="flex items-center justify-between mb-10">
            <h1 className="logo text-3xl">Anony Sender</h1>
            <div className="space-x-5">
                <button className="btn-grad" onClick={() => setShowForm(true)}>
                    Add New
                </button>
                <button
                    className="text-white font-semibold hover:text-lg transition-all"
                    onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default AuthedNav;
