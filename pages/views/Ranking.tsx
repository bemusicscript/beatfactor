import React from "react";
import { NextPage, NextPageContext } from "next";

interface PlayerInfo {
  id: number;
  fp: number;
  name: string;
  playCount: number;
  rank: number;
  avatar: string;
  roles: string;
}

type RankingContext = NextPageContext & {
  query: {
    players: PlayerInfo[];
  };
}

const Player: React.FC<PlayerInfo> = ({ rank, fp, name, avatar }) => {
  return (
    <div className="player-box">
      <div className="player-info">
        <img className="avatar" src={avatar} />
        <h3 className="rank">{`#${rank}`}</h3>
        <h5 className="name">{name}</h5>
      </div>
      <div className="player-score">
        <div className="factor-point">
          <p>{fp}</p>
        </div>
        <div className="weekly-change">
          <p>{1}</p>
        </div>
      </div>
    </div>
  )
}

const Ranking: NextPage<{ players: PlayerInfo[] }> = ({ players }) => {
  return (
    <div className="ranking-box">
      <div className="ranking-header">
        <div className="player-info">
          <h5 className="rank">Rank</h5>
          <h5 className="name">Name</h5>
        </div>
        <div className="player-score">
          <h5 className="factor-point">FP</h5>
          <h5>Weekly Change</h5>
        </div>
      </div>
      {players && players.map((player, index) => {
        return <Player {...player} key={index} />
      })}
    </div>
  )
}

Ranking.getInitialProps = (ctx: RankingContext) => {
  return {
    players: ctx.query.players
  }
}

export default Ranking;