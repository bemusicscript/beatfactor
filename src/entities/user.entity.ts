import { Entity, Column, OneToMany, PrimaryColumn, JoinColumn, Repository } from 'typeorm';
import { Role } from './role.entity';
import { Playdata } from './playdata.entity';

@Entity()
export class Userdata {
  @PrimaryColumn('varchar')
  userID: string;

  @Column('varchar')
  name: string;

  @Column('float')
  fp: number;

  @Column('int')
  playCount: number;

  @Column('varchar', { nullable: true })
  avatar?: string;

  @OneToMany(type => Role, Role => Role.user, { cascade: true })
  roles: Role[];

  @OneToMany(type => Playdata, playdata => playdata.user, { cascade: true })
  playdata?: Playdata[];
}

export class UserdataRepository extends Repository<Userdata> { }