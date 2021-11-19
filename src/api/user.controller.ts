import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseFilters } from "@nestjs/common";

import { UsersService } from "./user.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../entities/user.entity";

import type { Response } from "../../interfaces";

@Controller("api/user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id')
  async create(@Param('id') userID: string, @Body() createUserDto: CreateUserDto): Promise<Response<User>> {
    const userCreated = await this.usersService.create(userID, createUserDto);
    return {
      responseCode: userCreated ? 200 : 400,
      responseMessage: userCreated ? "User created" : "Bad request",
      responseData: userCreated
    };
  }

  @Get(':id')
  async findOne(@Param('id') userID: string): Promise<Response<User>> {
    const user = await this.usersService.findOne(userID);
    return {
      responseCode: user ? 200 : 404,
      responseMessage: user ? "User found" : "User not found",
      responseData: user
    };
  }

  @Get(':id/detail')
  async findOneDetail(@Param('id') userID: string): Promise<Response<User>> {
    const user = await this.usersService.findOneDetail(userID);
    return {
      responseCode: user ? 200 : 404,
      responseMessage: user ? "User found" : "User not found",
      responseData: user
    };
  }

  @Get()
  async findAll(): Promise<Response<User[]>> {
    const users = await this.usersService.findAllDescFP();
    return {
      responseCode: users.length ? 200 : 404,
      responseMessage: users.length ? "Users found" : "Users not found",
      responseData: users
    };
  }
}