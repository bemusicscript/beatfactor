import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseFilters } from "@nestjs/common";

import { PlaydataService } from "./playdata.service";
import { CreatePlaydataDto } from "../../dto/create-playdata.dto";
import { AllExceptionsFilter } from "../all-exceptions.filter";

import type { Response } from "../../interfaces";
import { Playdata, User } from "src/entities";

@Controller("api/playdata")
export class PlaydataController {
  constructor(private readonly playdataSerivce: PlaydataService) {}

  @Post(':id')
  @UseFilters(new AllExceptionsFilter())
  async create(@Param('id') id: string, @Body() createPlaydataDto: CreatePlaydataDto): Promise<Response<Playdata>> {
    const playdataCreated = await this.playdataSerivce.create(id, createPlaydataDto);
    return {
      responseCode: playdataCreated ? 200 : 400,
      responseMessage: playdataCreated ? "Playdata created" : "Bad request",
      responseData: playdataCreated
    }
  }
}