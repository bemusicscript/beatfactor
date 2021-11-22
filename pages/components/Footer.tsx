import React from "react";
import { Navbar } from "./Navbar";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="who-made-this">
          {"BeatFactor by "}<a href="https://github.com/SieR-VR">SieR</a>
        </div>
        <Navbar pages={["home", "about", "ranking"]}/>
        <div className="privacy">
          {"Privacy Policy"}
        </div>
      </footer>
    )
  }
}