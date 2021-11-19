import { Entity, Column, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Playdata } from './playdata.entity';
import { Role } from './roles.entity';

@Entity()
export class User {
  @PrimaryColumn()
  userID: string;

  @Column()
  name: string;

  @Column()
  fp: number;

  @Column()
  playCount: number;

  @Column()
  rank: number;

  @Column()
  avatar: string;

  @OneToMany(type => Role, Role => Role.user, { cascade: true })
  roles: Role[];

  @OneToMany(type => Playdata, playdata => playdata.user, { cascade: true })
  playdata: Playdata[];
}