import { Entity, Column, PrimaryColumn, Repository } from "typeorm";

@Entity()
export class Songdata {
  @PrimaryColumn()
  mapHash: string;

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

export class SongdataRepository extends Repository<Songdata> { }