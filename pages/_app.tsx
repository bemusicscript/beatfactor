import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Header, Footer } from "./components";
import "./index.scss";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>BeatFactor</title>
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      </Head>
      <Header defaultDark />
      <div className="content-placeholder">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default App;