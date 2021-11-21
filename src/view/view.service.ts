import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Userdata } from '../entities/user.entity';

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(Userdata)
    private readonly userRepository: Repository<Userdata>,
  ) {}

  async findAll(): Promise<Userdata[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.fp', 'DESC')
      .getMany();
  }

  async findOneDetail(userID: string): Promise<Userdata | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.playdata', 'playdata')
      .innerJoinAndSelect('playdata.songdata', 'songdata')
      .leftJoinAndSelect("playdata.pauseEvents", "pauseEvent")
      .leftJoinAndSelect("playdata.handScores", "handScore")
      .orderBy('playdata.createdAt', 'DESC')
      .where('user.userID = :userID', { userID })
      .getOne();
  }

  async getScoresaberLink(): Promise<string> {
    return "https://scoresaber.com/";
  }
}


