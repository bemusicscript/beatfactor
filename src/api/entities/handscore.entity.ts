import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Playdata } from "./playdata.entity";

@Entity()
export class HandScore {
  @PrimaryGeneratedColumn()
  handScoreID?: number;

  @ManyToOne(type => Playdata, playdata => playdata.handScores)
  @JoinColumn()
  playdata?: Playdata

  @Column("varchar")
  type: string;

  @Column("float")
  avgScore: number;

  @Column("float")
  beforeCutScore: number;

  @Column("float")
  afterCutScore: number;

  @Column("float")
  accScore: number;

  @Column("int")
  badCut: number;

  @Column("int")
  miss: number;

  @Column("float")
  handDistance: number;
}