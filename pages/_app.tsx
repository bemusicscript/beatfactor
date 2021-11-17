import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
 
import { Header, Footer } from "../components";

import "./index.scss";
import "./Footer.scss";
import "./Header.scss";
import "./Navbar.scss";
import "./Home.scss";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body && body.classList.add("dark-mode");
  }, []);

  return (
    <>
      <Head>
        <title>KBS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://unpkg.com/mvp.css"/>
      </Head>
      <Header isDefaultDark/>
      <div className="content-placeholder">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
};

export default App;