import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Songdata {
  @PrimaryColumn()
  mapHash: string;

  @PrimaryColumn()
  gameMode: string;

  @PrimaryColumn()
  songDifficulty: string;

  @Column()
  songName: string;

  @Column()
  songSubName: string;

  @Column()
  songArtist: string;

  @Column()
  mapAuthor: string;

  @Column('int')
  maxPossibleScore: number;

  @Column('float', { default: 0 })
  factor?: number;
}