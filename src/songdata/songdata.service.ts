import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UpdateFactorDto } from "dto/update-factor.dto";
import { SongdataDto } from "dto/songdata.dto";
import { Songdata } from "../entities/songdata.entity";

import { RANKBOT_URL } from "../secrets/rankbot";
import { firstValueFrom } from "rxjs";

@Injectable()
export class SongdataService {
  constructor(
    @InjectRepository(Songdata) private readonly songdataRepository: Repository<Songdata>,
    private readonly httpService: HttpService
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
    console.log(updateFactorDto);

    const songdata = await this.songdataRepository.findOne({
      mapHash: updateFactorDto.mapHash,
      songDifficulty: updateFactorDto.songDifficulty,
      gameMode: updateFactorDto.gameMode
    });
    if (!songdata) return undefined;

    songdata.factor = updateFactorDto.factor;

    await firstValueFrom(this.httpService.post(RANKBOT_URL, {
      headers: { "Content-Type": "application/json" },
      content: `${songdata.songName} ${songdata.songDifficulty} ${songdata.gameMode} ${songdata.factor}Factor`,
    }));

    const updatedSongdata = await this.songdataRepository.save(songdata);
    return updatedSongdata;
  }
}