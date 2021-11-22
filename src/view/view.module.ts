import { Module } from "@nestjs/common";
import { UserdataModule } from "../user/userdata.module";

import { ViewController } from "./view.controller";
import { ViewService } from "./view.service";

@Module({
  imports: [UserdataModule],
  controllers: [ViewController],
  providers: [ViewService],
  exports: [ViewService]
})

export class ViewModule { }