import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";

import { SongdataController } from "./songdata.controller";
import { SongdataService } from "./songdata.service";

import { Songdata } from "../entities/songdata.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Songdata]), HttpModule],
  controllers: [SongdataController],
  providers: [SongdataService],
  exports: [SongdataService]
})

export class SongdataModule {}