import { Controller, Get, Query, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { PlayersService } from "./players.service";
import { Player } from "./interface/player.interface";

@Controller("players")
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    console.log(createPlayerDto);
    this.playersService.create(createPlayerDto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }
}