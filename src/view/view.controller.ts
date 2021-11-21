import { Controller, Get, Render, UseFilters, Param } from "@nestjs/common";

import { ViewService } from "./view.service";
import { AllExceptionsFilter } from "../all-exceptions.filter";

import { Userdata } from "../entities/user.entity";

@Controller("/")
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get("/")
  @Render("Home")
  @UseFilters(new AllExceptionsFilter())
  async root(): Promise<{ scoresaberLink: string }> {
    return { scoresaberLink: await this.viewService.getScoresaberLink() };
  }

  @Get("ranking")
  @Render("Ranking")
  @UseFilters(new AllExceptionsFilter())
  async ranking(): Promise<{ players: Userdata[] }> {
    return { players: await this.viewService.findAll() };
  }

  @Get("user/:id")
  @Render("User")
  async user(@Param('id') id: string): Promise<{ user: Userdata | undefined }> {
    const res = await this.viewService.findOneDetail(id);
    console.log(res);
    return { user: res };
  }
}