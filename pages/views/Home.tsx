import React from "react";
import { NextPage, NextPageContext } from "next";

interface HomeProps {
  scoresaberLink: string;
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <div className="welcome-to-beatfactor">
      <h2 className="hello">{"Hello!"}</h2>
      <p className="description">{"BeatFactor is simillar with "}
        <a href={props.scoresaberLink}>ScoreSaber</a>
        {", for BeatSaber custom maps."}
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