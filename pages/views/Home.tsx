import React from "react";
import { NextPage, NextPageContext } from "next";
// import "./Home.scss";

const Home: NextPage = () => {
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

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      // props 로 전달할 정보
    }
  }
}

export default Home;