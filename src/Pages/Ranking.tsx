import React from "react";

interface PlayerInfo {
  id: number;
  fp: number;
  name: string;
  playCount: number;
  rank: number;
  avatar: string;
  roles: string;
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

export default class Ranking extends React.Component<{}, { players?: PlayerInfo[] }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    const url = 'https://nest.korea-bs.kro.kr/api/user';
    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          players: res
        })
      })
  }

  render() {
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
        {this.state.players && this.state.players.map((player, index) => {
          return <Player {...player} key={index} />
        })}
      </div>
    )
  }
}