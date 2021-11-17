import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 

import { PlayersService } from "./services/players.service";
import { PlayersController } from "./controllers/players.controller";
import { Player } from "./models/player.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
  ],
  providers: [PlayersService],
  controllers: [PlayersController],
})

export class PlayersModule {}