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
      gameMode: string;
      songDifficulty: string;
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

const DiffColors: { [key: string]: string } = {
  Easy: "#00ff00",
  Normal: "#ffff00",
  Hard: "#ff0000",
  Expert: "#0000ff",
  ExpertPlus: "#ff00ff",
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
          <h3 className="map-title">Title</h3>
          <h3 className="score-box-score">Score</h3>
        </div>
        {user.playdata.map((playdata, index) => (
          <div className="playdata-item" key={index}>
            <div className="song-info">
              <p className="song-name">
                {`${playdata.songdata.songArtist} - ${playdata.songdata.songName}`}
              </p>
              {playdata.songdata.songSubName && 
                <p className="song-subname">
                  {`${playdata.songdata.songSubName}`}
                </p>
              }
              <p className="song-gamemode">
                {playdata.songdata.gameMode}
              </p>
              <p className="song-difficulty" style={{color: DiffColors[playdata.songdata.songDifficulty]}} >
                {`${playdata.songdata.songDifficulty}`}
              </p>
            </div>
            <div className="score-box-score">
              <p>{`Accuracy: ${playdata.accuracy.toFixed(2)}%`}</p>
              <p className="factor-point">{`(${playdata.factorPoint.toFixed(2)}FP)`}</p>
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