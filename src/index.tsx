import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./Essentials";
import "./color-mode.css";

const colorPreference = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
window.onload = () => {
    const body = document.querySelector("body");
    body && body.classList.add(colorPreference ? "dark-mode" : "light-mode");
};

ReactDOM.render(
    <Header isDefaultDark={colorPreference} />,
    document.getElementById("root")
);
