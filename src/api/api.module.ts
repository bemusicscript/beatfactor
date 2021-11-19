import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { User } from "../entities/user.entity";

import { PlaydataController } from "./playdata.controller";
import { PlaydataService } from "./playdata.service";
import { Playdata } from "../entities/playdata.entity";

import { HandScore } from "../entities/handscore.entity";
import { PlayEvent } from "../entities/playevent.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Playdata, HandScore, PlayEvent])],
  controllers: [UsersController, PlaydataController],
  providers: [UsersService, PlaydataService],
})

export class APIModule { }