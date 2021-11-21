import Next from "next";
import { Module } from "@nestjs/common";
import { RenderModule } from "nest-next";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ViewModule } from "./view/view.module";
import { PlaydataModule } from "./playdata/playdata.module";
import { SongdataModule } from "./songdata/songdata.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule, PlaydataModule, SongdataModule, ViewModule,
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== "production" })),
    TypeOrmModule.forRoot()
  ]
})

export class AppModule { }