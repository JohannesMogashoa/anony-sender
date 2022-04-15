import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

// Initializing TRPC server on the Next.js server
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@/backend/routers";

// Check to see the current environment then generate the appropriate URL
function getBaseUrl() {
    if (process.browser) return ""; // Browser should use current path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
    config({ ctx }) {
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            url,
        };
    },
    ssr: false,
})(MyApp);
