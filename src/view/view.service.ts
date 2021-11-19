import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.fp', 'DESC')
      .getMany();
  }

  async findOneDetail(userID: number): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.userID = :userID', { userID })
      .innerJoinAndSelect('user.playdata', 'playdata')
      .leftJoinAndSelect("playdata.playEvents", "playEvent")
      .leftJoinAndSelect("playdata.handScores", "handScore")
      .getOne();
  }

  async getScoresaberLink(): Promise<string> {
    return "https://scoresaber.com/";
  }
}


