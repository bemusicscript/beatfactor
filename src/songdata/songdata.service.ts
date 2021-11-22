import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UpdateFactorDto } from "dto/update-factor.dto";
import { SongdataDto } from "dto/songdata.dto";
import { Songdata } from "../entities/songdata.entity";

@Injectable()
export class SongdataService {
  constructor(
    @InjectRepository(Songdata) private readonly songdataRepository: Repository<Songdata>
  ) {}

  async save(songdata: SongdataDto): Promise<Songdata> {
    return await this.songdataRepository.save(songdata);
  }

  async findOne(songdata: SongdataDto): Promise<Songdata | undefined> {
    return await this.songdataRepository.findOne({ 
      mapHash: songdata.mapHash,
      songDifficulty: songdata.songDifficulty,
      gameMode: songdata.gameMode
    });
  }

  async UpdateFactor(updateFactorDto: UpdateFactorDto): Promise<Songdata | undefined> {
    const songdata = await this.songdataRepository.findOne({
      mapHash: updateFactorDto.mapHash,
      songDifficulty: updateFactorDto.songDifficulty,
      gameMode: updateFactorDto.gameMode
    });
    if (!songdata) return undefined;

    songdata.factor = updateFactorDto.factor;
    const updatedSongdata = await this.songdataRepository.save(songdata);
    return updatedSongdata;
  }
}