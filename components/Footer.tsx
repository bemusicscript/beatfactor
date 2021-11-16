import React from "react";
import { Navbar } from "./Navbar";

// import "./Footer.scss";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="who-made-this">
          {"KBS by "}<a href="https://github.com/SieR-VR">SieR</a>
        </div>
        <Navbar pages={["Home", "About", "Ranking"]}/>
        <div className="privacy">
          {"Privacy Policy"}
        </div>
      </footer>
    )
  }
}