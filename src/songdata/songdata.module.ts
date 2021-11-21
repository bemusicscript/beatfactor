import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SongdataController } from "./songdata.controller";
import { SongdataService } from "./songdata.service";

import { PlaydataModule } from "../playdata/playdata.module";
import { Songdata } from "../entities/songdata.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Songdata]), PlaydataModule],
  controllers: [SongdataController],
  providers: [SongdataService],
  exports: [SongdataService]
})

export class SongdataModule {}