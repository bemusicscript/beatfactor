import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";

import { Userdata } from "./user.entity";
import { Songdata } from "./songdata.entity";
import { PauseEvent } from "./pauseevent.entity";
import { HandScore } from "./handscore.entity";

@Entity()
export class Playdata {
  @PrimaryColumn('varchar', { length: 36 })
  userID: string;

  @PrimaryColumn('varchar', { length: 40 })
  mapHash: string;

  @PrimaryColumn('varchar', { length: 20 })
  gameMode: string;

  @PrimaryColumn('varchar', { length: 20 })
  songDifficulty: string;

  @ManyToOne(type => Userdata, user => user.playdata)
  @JoinColumn()
  user: Userdata;

  @ManyToOne(type => Songdata, { cascade: true })
  @JoinColumn()
  songdata: Songdata;

  @Column("int")
  rawScore: number;

  @Column("int")
  modifiedScore: number;

  @Column("float")
  accuracy: number;

  @Column("float")
  factorPoint: number;

  @OneToMany(type => PauseEvent, pauseEvent => pauseEvent.playdata, { cascade: true })
  pauseEvents: PauseEvent[];

  @OneToMany(type => HandScore, handScore => handScore.playdata, { cascade: true })
  handScores: HandScore[];

  @CreateDateColumn()
  createdAt?: Date;
}