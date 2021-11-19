import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseFilters } from "@nestjs/common";

import { UsersService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { NoData } from "../interfaces/nodata.interface";

@Controller("api/user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id')
  async create(@Param('id') userID: string, @Body() createUserDto: CreateUserDto) {
    this.usersService.create(userID, createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') userID: string): Promise<User | NoData> {
    return this.usersService.findOne(userID);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAllDescFP();
  }
}