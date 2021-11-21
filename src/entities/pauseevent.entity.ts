import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Playdata } from "./playdata.entity";

@Entity()
export class PauseEvent {
  @PrimaryGeneratedColumn()
  PauseEventID?: number;

  @ManyToOne(type => Playdata, playdata => playdata.pauseEvents)
  @JoinColumn()
  playdata?: Playdata;

  @Column("datetime")
  startTime: Date;

  @Column("float")
  duration: number;
}