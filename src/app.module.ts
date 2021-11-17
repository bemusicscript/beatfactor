import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PlayersModule } from "./players/players.module";
import { Player } from "./players/models/player.entity";

@Module({
  imports: [
    PlayersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [Player],
      synchronize: true,
    }),
  ],
  controllers: [],
})

export class AppModule { }