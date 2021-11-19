import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreatePlaydataDto } from "../../dto/create-playdata.dto";
import { Playdata } from "../entities/playdata.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class PlaydataService {
  constructor(
    @InjectRepository(Playdata) private readonly playdataRepository: Repository<Playdata>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(userID: string, createPlaydataDto: CreatePlaydataDto): Promise<Playdata | undefined> {
    const user = await this.userRepository.findOne({ userID });
    if (!user) return undefined;

    const playdata: Playdata = { user, ...createPlaydataDto, };
    return await this.playdataRepository.save(playdata);
  }
}