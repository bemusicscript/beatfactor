import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SongdataService } from "../songdata/songdata.service";
import { UserService } from "../user/user.service";

import { CreatePlaydataDto } from "../../dto/create-playdata.dto";
import { Playdata } from "../entities/playdata.entity";
import { Songdata } from "../entities/songdata.entity";
import { CalculateFactor } from "../secrets/calculator";

@Injectable()
export class PlaydataService {
  constructor(
    @InjectRepository(Playdata) private readonly playdataRepository: Repository<Playdata>,
    private readonly songdataService: SongdataService,
    private readonly userService: UserService
  ) { }

  async create(userID: string, createPlaydataDto: CreatePlaydataDto): Promise<Playdata | undefined> {
    const user = await this.userService.findOne(userID);
    if (!user) return undefined;

    const songdata = await this.songdataService.save(createPlaydataDto.songdata);
    const accuracy = createPlaydataDto.rawScore / songdata.maxPossibleScore! * 100;
    const factorPoint = CalculateFactor(songdata.factor!, accuracy);

    const playdata: Playdata = { ...createPlaydataDto, user, accuracy, factorPoint };
    const playdataResult = await this.playdataRepository.save(playdata);

    if (factorPoint > 0)
      if (!(await this.userService.updateFP(user, songdata))) 
        return undefined;

    return playdataResult;
  }

  async UpdateFactorBySongdata(songdata: Songdata): Promise<Playdata[] | undefined> {
    const playdatas = await this.playdataRepository.find({ songdata });
    if (!playdatas) return undefined;

    playdatas.forEach(async (playdata) => { playdata.factorPoint = CalculateFactor(songdata.factor!, playdata.accuracy); });
    const updated = await this.playdataRepository.save(playdatas);
    if (!updated) return undefined;

    const flag = this.userService.UpdateWholeUserFP();
    if (!flag) return undefined;
    
    return updated;
  }
}