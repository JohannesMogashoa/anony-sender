import Head from "next/head";
import React from "react";
import { LayoutProps } from "utils/types";

const Layout = ({ children, pageOptions }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{pageOptions.title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={pageOptions.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main role={"main"} className="container w-screen h-screen p-10 overflow-hidden">
                {children}
            </main>
        </>
    );
};

export default Layout;
