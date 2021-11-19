import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseFilters } from "@nestjs/common";

import { PlaydataService } from "../services/playdata.service";
import { CreatePlaydataDto } from "../dto/create-playdata.dto";
import { AllExceptionsFilter } from "../all-exceptions.filter";

@Controller("api/playdata")
export class PlaydataController {
  constructor(private readonly playdataSerivce: PlaydataService) {}

  @Post(':id')
  @UseFilters(new AllExceptionsFilter())
  async create(@Param('id') id: string, @Body() createPlaydataDto: CreatePlaydataDto): Promise<any> {
    return this.playdataSerivce.create(id, createPlaydataDto);
  }

  @Get(':id')
  @UseFilters(new AllExceptionsFilter())
  async findAll(@Param('id') id: string): Promise<any> {
    return this.playdataSerivce.find(id);
  }
}