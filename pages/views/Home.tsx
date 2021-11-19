import React from "react";
import { NextPage, NextPageContext } from "next";

interface HomeProps {
  scoresaberLink: string;
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <div className="welcome-to-kbs">
      <h2 className="hello">{"안녕하세요!"}</h2>
      <p className="description">{"KBS는 Korea-Beatsaber의 약자로, "}
        <a href={props.scoresaberLink}>ScoreSaber</a>
        {"와 비슷한 한국인들을 위한 서비스입니다."}
      </p>
    </div>
  )
}

Home.getInitialProps = (ctx: NextPageContext) => {
  return {
    scoresaberLink: ctx.query.scoresaberLink as string
  }
}

export default Home;