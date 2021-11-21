import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";

import { ViewController } from "./view.controller";
import { ViewService } from "./view.service";

@Module({
  imports: [UserModule],
  controllers: [ViewController],
  providers: [ViewService],
  exports: [ViewService]
})

export class ViewModule { }