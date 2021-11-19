import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { NoData } from "../interfaces/nodata.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findAllDescFP(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder("user")
      .orderBy("user.fp", "DESC")
      .getMany();
  }

  async findOne(id: string): Promise<User | NoData> {
    return await this.userRepository.findOne(id).then(user => {
      if (!user) {
        return {
          responseCode: 404,
          message: "User not found"
        }
      }

      return user;
    })
  }

  async create(id: string, createUserDto: CreateUserDto) {
    const user: User = { 
      userID: id, 
      ...createUserDto, 
      roles: createUserDto.roles.map(role => { return { name: role }}),
      playdata: []
    };
    return await this.userRepository.save(user);
  }
}