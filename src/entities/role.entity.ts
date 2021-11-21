import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Repository } from 'typeorm';
import { Userdata } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  roleID?: number;

  @Column()
  name: string;

  @ManyToOne(type => Userdata)
  @JoinColumn()
  user?: Userdata;
}