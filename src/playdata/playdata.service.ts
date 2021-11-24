import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SongdataService } from "../songdata/songdata.service";
import { UserdataService } from "../user/userdata.service";

import { CreatePlaydataDto } from "../../dto/create-playdata.dto";
import { Playdata } from "../entities/playdata.entity";
import { Songdata } from "../entities/songdata.entity";
import { CalculateFactor } from "../secrets/calculator";

@Injectable()
export class PlaydataService {
  constructor(
    @InjectRepository(Playdata) private readonly playdataRepository: Repository<Playdata>,
    @Inject(forwardRef(() => SongdataService)) private readonly songdataService: SongdataService,
    @Inject(forwardRef(() => UserdataService)) private readonly userdataService: UserdataService
  ) { }

  async create(userID: string, createPlaydataDto: CreatePlaydataDto): Promise<Playdata | undefined> {
    const user = await this.userdataService.findOne(userID);
    if (!user) return undefined;

    let songdata = await this.songdataService.findOne(createPlaydataDto.songdata);
    if (!songdata) {
      songdata = await this.songdataService.save(createPlaydataDto.songdata);
      songdata.factor = 0;
    }

    const accuracy = createPlaydataDto.rawScore / songdata.maxPossibleScore! * 100;
    const factorPoint = CalculateFactor(songdata.factor!, accuracy);

    const prePlaydata = await this.playdataRepository.findOne({ userID, ...createPlaydataDto.songdata });
    if (prePlaydata) {
      if (prePlaydata.accuracy > accuracy) {
        return { ...prePlaydata }
      }
    }

    const playdata: Playdata = {
      userID,
      ...createPlaydataDto, 
      user, 
      accuracy, 
      factorPoint,
      ...songdata
    };
    const playdataResult = await this.playdataRepository.save(playdata);

    if (factorPoint > 0)
      if (!(await this.userdataService.updateFP(user, songdata))) 
        return undefined;

    return playdataResult;
  }

  async UpdateFactorBySongdata(songdata: Songdata): Promise<Playdata[] | undefined> {
    const playdatas = await this.playdataRepository.find({ songdata });
    if (!playdatas) return undefined;

    playdatas.forEach(async (playdata) => { playdata.factorPoint = CalculateFactor(songdata.factor!, playdata.accuracy); });
    const updated = await this.playdataRepository.save(playdatas);
    if (!updated) return undefined;

    const flag = this.userdataService.UpdateWholeUserFP();
    if (!flag) return undefined;
    
    return updated;
  }
}