import Next from "next";
import { RenderModule } from "nest-next";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ViewController } from "./view/view.controller";
import { ViewService } from "./view/view.service";
import { APIModule } from "./api/api.module";
import { User } from "./entities";

@Module({
  imports: [
    APIModule,
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== "production" })),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [ViewController],
  providers: [ViewService]
})

export class AppModule { }