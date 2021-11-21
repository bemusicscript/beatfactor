import React from "react";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";

interface PlayerInfo {
  userID: number;
  name: string;
  fp: number;
  playCount: number;
  avatar: string;
  roles: string;
  rank: number;
}

type RankingContext = NextPageContext & {
  query: {
    players: PlayerInfo[];
  };
}

const Player: React.FC<PlayerInfo> = ({ userID, rank, fp, name, avatar }) => {
  return (
    <div className="player-box">
      <div className="player-info">
        <img className="avatar" src={avatar} />
        <h3 className="rank">{`#${rank}`}</h3>
        <Link href={`/user/${userID}`}>{name}</Link>
      </div>
      <div className="player-score">
        <div className="factor-point">
          <p>{`${fp.toFixed(2)}FP`}</p>
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
        return <Player {...player} rank={index + 1} key={index} />
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