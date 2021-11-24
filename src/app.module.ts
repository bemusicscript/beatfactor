import * as path from "path";

import Next from "next";
import { Module } from "@nestjs/common";
import { RenderModule } from "nest-next";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

import { ViewModule } from "./view/view.module";
import { PlaydataModule } from "./playdata/playdata.module";
import { SongdataModule } from "./songdata/songdata.module";
import { UserdataModule } from "./user/userdata.module";


@Module({
  imports: [
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== "production" })),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
          ),
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, "../logs"),
          filename: "debug.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
          ),
          level: "debug",
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, "../logs"),
          filename: "error.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
          ),
          level: "error",
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, "../logs"),
          filename: "info.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
          ),
          level: "info",
        }),
      ],
    }),
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({ 
      rootPath: path.join(__dirname, "..", "public"),
      serveRoot: "/static"
    }),
    UserdataModule, PlaydataModule, SongdataModule, ViewModule,
  ]
})

export class AppModule { }