import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlaydataService } from "../playdata/playdata.service";

import { UpdateFactorDto } from "dto/update-factor.dto";
import { SongdataDto } from "dto/songdata.dto";
import { Songdata } from "../entities/songdata.entity";

@Injectable()
export class SongdataService {
  constructor(
    @InjectRepository(Songdata) private readonly songdataRepository: Repository<Songdata>,
    @Inject(forwardRef(() => PlaydataService)) private readonly playdataService: PlaydataService
  ) {}

  async save(songdata: SongdataDto): Promise<Songdata> {
    return await this.songdataRepository.save(songdata);
  }

  async UpdateFactor(mapHash: string, updateFactorDto: UpdateFactorDto): Promise<Songdata | undefined> {
    const songdata = await this.songdataRepository.findOne({ mapHash });
    if (!songdata) return undefined;

    songdata.factor = updateFactorDto.factor;
    const updatedSongdata = await this.songdataRepository.save(songdata);

    this.playdataService.UpdateFactorBySongdata(updatedSongdata);
    return updatedSongdata;
  }
}