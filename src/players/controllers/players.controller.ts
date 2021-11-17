import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseFilters } from "@nestjs/common";
import { PlayersService } from "../services/players.service";
import { Player } from "../models/player.entity";
import { AllExceptionsFilter } from "../exceptions.filter";

@Controller("players")
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @UseFilters(AllExceptionsFilter)
  @Post()
  async create(@Body() playerData: Player): Promise<any> {
    return this.playersService.create(playerData);
  }

  @UseFilters(AllExceptionsFilter)
  @Get()
  async findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }
}