import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";

import { PlayEvent } from "./playevent.entity";
import { HandScore } from "./handscore.entity";
import { User } from "./user.entity";

@Entity()
export class Playdata {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(type => User, user => user.playdata)
  @JoinColumn()
  user: User;

  @Column("int")
  score: number;

  @Column("float")
  accuracy: number;

  @Column("varchar")
  mapHash: string;

  @OneToMany(type => PlayEvent, playEvent => playEvent.playdata, { cascade: true })
  playEvents: PlayEvent[];

  @OneToMany(type => HandScore, handScore => handScore.playdata, { cascade: true })
  handScores: HandScore[];

  @CreateDateColumn()
  createdAt?: Date;
}