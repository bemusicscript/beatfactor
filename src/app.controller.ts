import { Controller, Get, Render, UseFilters } from "@nestjs/common";

@Controller()
export class AppController {
  @Render("Home")
  @Get()
  public index() {
    return {};
  }
}