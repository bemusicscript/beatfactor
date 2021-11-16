import React from "react";
import { Navbar } from "./Navbar";

import "./Header.scss";

interface HeaderProps {
  isDefaultDark: boolean;
}

interface HeaderState {
  isDark: boolean;
}

const ani_darkToLight = "dark-to-light";
const ani_lightToDark = "dark-to-light 0.5s ease-in-out forwards";  

export default class Header extends React.Component<HeaderProps, HeaderState> {
  private readonly onColorToggle = () => {
    const body = document.querySelector("body");
    body && body.classList.toggle("dark-mode");
    body && body.classList.toggle("light-mode");

    this.setState({ isDark: !this.state.isDark });
  }

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isDark: this.props.isDefaultDark
    };
  }

  render() {
    return (
      <header>
        <h1>{"KBS"}</h1>
        <Navbar pages={["Home", "About", "Ranking"]}/>
        <div className="color-toggle-box" onClick={this.onColorToggle}>
          <button
            className="color-toggle"
            style={{ 
              animation: `${ this.state.isDark ? "dark-to-light" : "light-to-dark" } 0.5s ease-in-out forwards` 
            }}
          />
        </div>
      </header>        
    );
  }
}