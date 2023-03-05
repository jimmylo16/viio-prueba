import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { GlobalProvider } from "@/context/global.context";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GlobalProvider>
  );
}
