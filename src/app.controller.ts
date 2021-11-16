import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
  @Render("Home")
  @Get()
  public index() {
    return {};
  }
}