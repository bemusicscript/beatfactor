import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Next from "next";
import { RenderModule } from "nest-next";

import { APIModule } from "./api/api.module";

@Module({
  imports: [
    APIModule,
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== "production" })),
    TypeOrmModule.forRoot(),
  ]
})

export class AppModule { }