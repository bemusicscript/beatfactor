import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn, Repository } from "typeorm";

import { Userdata } from "./user.entity";
import { Songdata } from "./songdata.entity";
import { PauseEvent } from "./pauseevent.entity";
import { HandScore } from "./handscore.entity";

@Entity()
export class Playdata {
  @PrimaryGeneratedColumn()
  PlaydataID?: number;

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

export class PlaydataRepository extends Repository<Playdata> { }