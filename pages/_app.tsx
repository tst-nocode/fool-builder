import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

if (process.env.NEXT_PUBLIC_DEBUG && typeof localStorage !== "undefined") {
  localStorage.setItem("debug", process.env.NEXT_PUBLIC_DEBUG);
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Fool-Builder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
