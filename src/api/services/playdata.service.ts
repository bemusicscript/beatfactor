import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreatePlaydataDto } from "../dto/create-playdata.dto";
import { Playdata } from "../entities/playdata.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class PlaydataService {
  constructor(
    @InjectRepository(Playdata) private readonly playdataRepository: Repository<Playdata>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(userID: string, createPlaydataDto: CreatePlaydataDto) {
    const playdata: Playdata = {
      user: (await this.userRepository.findOne(userID))!,
      ...createPlaydataDto
    }
    this.playdataRepository.save(playdata);
  }

  async find(userID: string): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder("User")
      .where("User.userID = :userID", { userID })
      .innerJoinAndSelect("User.playdata", "Playdata")
      .leftJoinAndSelect("Playdata.playEvents", "PlayEvent")
      .leftJoinAndSelect("Playdata.handScores", "HandScore")
      .getOne();
  }
}