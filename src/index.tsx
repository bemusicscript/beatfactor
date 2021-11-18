import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header, Footer } from "./Essentials";
import { Home, Ranking } from "./Pages";

import "./index.scss";

const colorPreference = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
window.onload = () => {
  const body = document.querySelector("body");
  body && body.classList.add(colorPreference ? "dark-mode" : "light-mode");
};

ReactDOM.render(
  <>
    <Router>
      <Header defaultDark={colorPreference} />
      <div className="content-placeholder">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ranking" element={<Ranking />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  </>,
  document.getElementById("root")
);
