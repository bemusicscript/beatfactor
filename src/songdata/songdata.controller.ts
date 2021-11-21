import { Controller, Post, Param, Body, UseFilters } from "@nestjs/common";

import { SongdataService } from "./songdata.service";
import { UpdateFactorDto } from "../../dto/update-factor.dto";
import { AllExceptionsFilter } from "../all-exceptions.filter";

import type { Response } from "../../interfaces";

@Controller("api/songdata")
export class SongdataController {
  constructor(private readonly songdataService: SongdataService) {}

  @Post(':hash')
  @UseFilters(new AllExceptionsFilter())
  async create(@Param('hash') hash: string, @Body() updateFactorDto: UpdateFactorDto): Promise<Response<undefined>> {
    const factorUpdated = await this.songdataService.UpdateFactor(hash, updateFactorDto);
    return {
      responseCode: factorUpdated ? 200 : 400,
      responseMessage: factorUpdated ? "Factor Updated" : "Bad request"
    }
  }
}