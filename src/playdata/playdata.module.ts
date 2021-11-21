import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Playdata } from "../entities/playdata.entity";
import { UserModule } from "../user/user.module";

import { PlaydataController } from "./playdata.controller";
import { PlaydataService } from "./playdata.service";

@Module({
  imports: [TypeOrmModule.forFeature([Playdata]), UserModule],
  controllers: [PlaydataController],
  providers: [PlaydataService],
  exports: [PlaydataService]
})

export class PlaydataModule {}