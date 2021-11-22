import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Playdata } from "../entities/playdata.entity";
import { UserdataModule } from "../user/userdata.module";
import { SongdataModule } from "../songdata/songdata.module";

import { PlaydataController } from "./playdata.controller";
import { PlaydataService } from "./playdata.service";

@Module({
  imports: [TypeOrmModule.forFeature([Playdata]), UserdataModule, SongdataModule],
  controllers: [PlaydataController],
  providers: [PlaydataService],
  exports: [PlaydataService]
})

export class PlaydataModule {}