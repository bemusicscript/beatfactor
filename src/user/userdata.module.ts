import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Userdata } from "../entities/user.entity";

import { UserdataController } from "./userdata.controller";
import { UserdataService } from "./userdata.service";

@Module({
  imports: [TypeOrmModule.forFeature([Userdata])],
  controllers: [UserdataController],
  providers: [UserdataService],
  exports: [UserdataService]
})

export class UserdataModule { }