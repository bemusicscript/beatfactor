import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Next from 'next';
import { RenderModule } from 'nest-next';

import { PlayersModule } from "./players/players.module";
import { Player } from "./players/models/player.entity";

import { AppController } from './app.controller';

@Module({
  imports: [
    PlayersModule,
    RenderModule.forRootAsync(
      Next({ 
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFileSystemPublicRoutes: false },
      }),
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [Player],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})

export class AppModule { }