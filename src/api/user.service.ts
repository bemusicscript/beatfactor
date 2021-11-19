import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../entities/user.entity";

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

  async findOne(userID: string): Promise<User | undefined> {
    return await this.userRepository.findOne(userID);
  }

  async findOneDetail(userID: string): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder("User")
      .where("User.userID = :userID", { userID })
      .innerJoinAndSelect("User.playdata", "Playdata")
      .leftJoinAndSelect("Playdata.playEvents", "PlayEvent")
      .leftJoinAndSelect("Playdata.handScores", "HandScore")
      .getOne();
  }

  async create(userID: string, createUserDto: CreateUserDto): Promise<User | undefined> {
    const isUserExist = await this.userRepository.findOne(userID);

    if (!isUserExist) return undefined;
    else {
      const user: User = { 
        userID, 
        ...createUserDto, 
        roles: createUserDto.roles.map(role => { return { name: role }}),
        playdata: []
      };
      return this.userRepository.create(user);
    }
  }
}