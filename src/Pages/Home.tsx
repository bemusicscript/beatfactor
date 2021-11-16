import React from "react";
import "./Home.scss";

export default class Home extends React.Component {
  render() {
    return (
      <div className="welcome-to-kbs">
        <h2 className="hello">{"안녕하세요!"}</h2>
        <p className="description">{"KBS는 Korea-Beatsaber의 약자로, "}
          <a href="https://scoresaber.com/">ScoreSaber</a>
          {"와 비슷한 한국인들을 위한 서비스입니다."}
        </p>
      </div>
    )
  }
}