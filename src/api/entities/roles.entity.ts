import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  roleID?: string;

  @Column()
  name: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user?: User;
}