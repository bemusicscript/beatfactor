import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SongdataController } from "./songdata.controller";
import { SongdataService } from "./songdata.service";

import { Songdata } from "../entities/songdata.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Songdata])],
  controllers: [SongdataController],
  providers: [SongdataService],
  exports: [SongdataService]
})

export class SongdataModule {}