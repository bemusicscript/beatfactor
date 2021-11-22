import * as path from "path";

import Next from "next";
import { Module } from "@nestjs/common";
import { RenderModule } from "nest-next";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";

import { ViewModule } from "./view/view.module";
import { PlaydataModule } from "./playdata/playdata.module";
import { SongdataModule } from "./songdata/songdata.module";
import { UserdataModule } from "./user/userdata.module";


@Module({
  imports: [
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== "production" })),
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({ 
      rootPath: path.join(__dirname, "..", "public"),
      serveRoot: "/static"
    }),
    UserdataModule, PlaydataModule, SongdataModule, ViewModule,
  ]
})

export class AppModule { }