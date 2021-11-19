import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";
import { Playdata } from "./";

@Entity()
export class PlayEvent {
  @PrimaryGeneratedColumn()
  playEventID?: number;

  @ManyToOne(type => Playdata, playdata => playdata.playEvents)
  @JoinColumn()
  playdata?: Playdata;

  @Column("varchar")
  type: string;

  @Column("datetime")
  startTime: Date;

  @Column("float")
  duration: number;
}