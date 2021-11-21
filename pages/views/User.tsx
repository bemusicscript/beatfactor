import React from "react";
import { NextPage, NextPageContext } from "next";

interface UserProps {
  userID: string;
  name: string;
  fp: number;
  playCount: number;
  avatar: string;
  roles: {
    roleID: string;
    name: string;
  }[];
  playdata: {
    PlaydataID: number;
    rawScore: number;
    modifiedScore: number;
    accuracy: number;
    factorPoint: number;
    songdata: {
      mapHash: string;
      songName: string;
      songSubName: string;
      songArtist: string;
      mapAuthor: string;
    },
    pauseEvents: {
      PauseEventID: number;
      startTime: number;
      duration: number;
    }[];
    handScores: {
      handScoreID: number;
      type: string;
      badCut: number;
      miss: number;
      handMovementDistance: number;
      saberMovementDistance: number;
      combo: number[];
    }[];
    createdAt: string;
  }[];
}

const User: NextPage<{ user: UserProps }> = ({ user }) => {
  return (
    <>
      <div className="user-info">
        <div className="user-info-avatar">
          <img src={`https://scoresaber.com/imports/images/usr-avatars/${user.userID}.jpg`} />
        </div>
        <div>
          <h2 className="user-info-name">{user.name}</h2>
          <p className="user-info-fp">{`Factor Point: ${user.fp.toFixed(2)}FP`}</p>
          <p className="user-info-playcount">{`Play Count: ${user.playCount}`}</p>
        </div>
      </div>
      <div className="user-playdata">
        <div className="playdata-title">
          <h3 className="map-title">Map Title</h3>
          <h3 className="score-box-score">Score</h3>
        </div>
        {user.playdata.map((playdata, index) => (
          <div className="playdata-item" key={index}>
            <div className="song-info">
              <h3>{`${playdata.songdata.songArtist} - ${playdata.songdata.songName}`}</h3>
              {playdata.songdata.songSubName && <p>{`(${playdata.songdata.songSubName})`}</p>}
            </div>
            <div className="score-box-score">
              <h4>{`${playdata.rawScore} [${playdata.accuracy.toFixed(2)}%]`}</h4>
              <p>{`(${playdata.factorPoint.toFixed(2)}FP)`}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

User.getInitialProps = async (ctx: NextPageContext) => {
  const user = ctx.query.user as unknown as UserProps;
  return { user };
}

export default User;