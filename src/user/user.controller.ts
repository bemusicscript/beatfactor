import { Controller, Get, Post, Body, Param } from "@nestjs/common";

import { UserService } from "./user.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { Userdata } from "../entities/user.entity";

import type { Response } from "../../interfaces";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':id')
  async create(@Param('id') userID: string, @Body() createUserDto: CreateUserDto): Promise<Response<Userdata>> {
    const userCreated = await this.userService.create(userID, createUserDto);
    return {
      responseCode: userCreated ? 200 : 400,
      responseMessage: userCreated ? "User created" : "Bad request",
      responseData: userCreated
    };
  }

  @Get(':id')
  async findOne(@Param('id') userID: string): Promise<Response<Userdata>> {
    const user = await this.userService.findOne(userID);
    return {
      responseCode: user ? 200 : 404,
      responseMessage: user ? "User found" : "User not found",
      responseData: user
    };
  }

  @Get(':id/detail')
  async findOneDetail(@Param('id') userID: string): Promise<Response<Userdata>> {
    const user = await this.userService.findOneDetail(userID);
    return {
      responseCode: user ? 200 : 404,
      responseMessage: user ? "User found" : "User not found",
      responseData: user
    };
  }

  @Get()
  async findAll(): Promise<Response<Userdata[]>> {
    const users = await this.userService.findAllDescFP();
    return {
      responseCode: users.length ? 200 : 404,
      responseMessage: users.length ? "Users found" : "Users not found",
      responseData: users
    };
  }
}