import { Injectable } from "@nestjs/common";
import { Player } from "./interface/player.interface";

@Injectable()
export class PlayersService {
  private readonly players: Player[] = [];

  create(player: Player) {
    this.players.push(player);
  }

  findAll(): Player[] {
    return this.players;
  }
}