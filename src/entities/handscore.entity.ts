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

  @Column("int")
  badCut: number;

  @Column("int")
  miss: number;

  @Column("float")
  handMovementDistance: number;

  @Column("float")
  saberMovementDistance: number;

  @Column("simple-array")
  combo: number[];
}