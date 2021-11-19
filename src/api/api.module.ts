import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./controllers/user.controller";
import { UsersService } from "./services/user.service";
import { User } from "./entities/user.entity";

import { PlaydataController } from "./controllers/playdata.controller";
import { PlaydataService } from "./services/playdata.service";
import { Playdata } from "./entities/playdata.entity";

import { HandScore } from "./entities/handscore.entity";
import { PlayEvent } from "./entities/playevent.entity";

import { AppController } from "./controllers/app.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User, Playdata, HandScore, PlayEvent])],
  controllers: [UsersController, AppController, PlaydataController],
  providers: [UsersService, PlaydataService],
})

export class APIModule { }