import React from "react";
import { Navbar } from "./Navbar";

interface HeaderProps {
  defaultDark: boolean;
}

interface HeaderState {
  isDark: boolean;
}

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
      isDark: this.props.defaultDark
    };
  }

  componentDidMount() {
    const body = document.querySelector("body");
    body && this.state.isDark && body.classList.add("dark-mode");
  }

  render() {
    return (
      <header>
        <div className="title-box">
          <img src="/static/BeatFactor-Logo.png"/>
          <h1>{"BeatFactor"}</h1>
        </div>
        <Navbar pages={["home", "about", "ranking"]}/>
        <div className="color-toggle-box" onClick={this.onColorToggle}>
          <button
            className="color-toggle"
            style={{ animation: `${ this.state.isDark ? "dark-to-light" : "light-to-dark" } 0.5s ease-in-out forwards` }}
          />
        </div>
      </header>        
    );
  }
}