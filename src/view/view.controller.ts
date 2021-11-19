import { Controller, Get, Render, UseFilters } from "@nestjs/common";

import { ViewService } from "./view.service";
import { AllExceptionsFilter } from "../all-exceptions.filter";

import { User } from "../entities";

@Controller("/")
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get("/")
  @Render("Home")
  @UseFilters(new AllExceptionsFilter())
  async root(): Promise<{ scoresaberLink: string }> {
    return { scoresaberLink: await this.viewService.getScoresaberLink() };
  }

  @Get("Ranking")
  @Render("Ranking")
  @UseFilters(new AllExceptionsFilter())
  async ranking(): Promise<{ players: User[] }> {
    return { players: await this.viewService.findAll() };
  }
}