import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Songdata } from "../entities/songdata.entity";
import { Userdata } from "../entities/user.entity";
import { CreateUserDto } from "dto/create-user.dto";

import { CalculateFPSum } from "../secrets/calculator";

@Injectable()
export class UserdataService {
  constructor(
    @InjectRepository(Userdata) private readonly userRepository: Repository<Userdata>
  ) {}

  async findAll(): Promise<Userdata[]> {
    return await this.userRepository.find();
  }

  async findAllDescFP(): Promise<Userdata[]> {
    return await this.userRepository
      .createQueryBuilder("user")
      .orderBy("user.fp", "DESC")
      .getMany();
  }

  async findOne(userID: string): Promise<Userdata | undefined> {
    return await this.userRepository.findOne(userID);
  }

  async findOneDetail(userID: string): Promise<Userdata | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.playdata', 'playdata')
      .innerJoinAndSelect('playdata.songdata', 'songdata')
      .leftJoinAndSelect("playdata.pauseEvents", "pauseEvent")
      .leftJoinAndSelect("playdata.handScores", "handScore")
      .orderBy('playdata.createdAt', 'DESC')
      .where('user.userID = :userID', { userID })
      .getOne();
  }

  async create(userID: string, createUserDto: CreateUserDto): Promise<Userdata | undefined> {
    const isUserExist = await this.userRepository.findOne(userID);

    if (isUserExist) return undefined;
    else {
      const user: Userdata = { 
        userID, 
        name: createUserDto.name,
        roles: createUserDto.roles.map(role => { return { name: role }}),
        fp: 0,
        playCount: 0
      };
      return this.userRepository.save(user);
    }
  }

  async updateFP(userdata: Userdata, songdata: Songdata): Promise<Userdata | undefined> {
    if (!songdata) return undefined;

    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.playdata", "playdata")
      .innerJoinAndSelect("playdata.songdata", "songdata")
      .where("user.userID = :userID", { userID: userdata.userID })
      .where("songdata.mapHash = :mapHash", { mapHash: songdata.mapHash })
      .getOne();
    if (!user) return undefined;

    const factorPoints = user.playdata!.map(playdata => playdata.factorPoint);
    const fp = CalculateFPSum(factorPoints);
    user.fp = fp;

    return this.userRepository.save(user);
  }

  async UpdateWholeUserFP(): Promise<Userdata[] | undefined> {
    const users = await this.userRepository.find();
    if (!users) return undefined;

    const updatedUsers = users.map(user => {
      const factorPoints = user.playdata!.map(playdata => playdata.factorPoint);
      const fp = CalculateFPSum(factorPoints);
      user.fp = fp;
      return user;
    });

    return this.userRepository.save(updatedUsers);
  }
}