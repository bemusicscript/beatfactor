import { Controller, Get, Render, UseFilters } from "@nestjs/common";
import { UsersService } from "../services/user.service";

import { AllExceptionsFilter } from "../all-exceptions.filter";

@Controller("/")
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/")
  @Render("Home")
  @UseFilters(new AllExceptionsFilter())
  root() {
    return {
      scoresaberLink: "https://scoresaber.com/",
    };
  }

  @Get("Ranking")
  @Render("Ranking")
  @UseFilters(new AllExceptionsFilter())
  async ranking() {
    const players = await this.usersService.findAllDescFP();
    return { players };
  }
}