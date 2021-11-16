import React from "react";
import ReactDOM from "react-dom";

import { Header, Footer } from "./Essentials";
import { Home } from "./Pages";

import "./index.scss";

const colorPreference = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
window.onload = () => {
  const body = document.querySelector("body");
  body && body.classList.add(colorPreference ? "dark-mode" : "light-mode");
};

ReactDOM.render(
  <>
    <Header isDefaultDark={colorPreference} />
    <div className="content-placeholder">
      <Home />
    </div>
    <Footer />
  </>,
  document.getElementById("root")
);
