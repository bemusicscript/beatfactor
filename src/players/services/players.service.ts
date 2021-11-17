import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult } from "typeorm";

import { Player } from "../models/player.entity";

@Injectable()
export class PlayersService {
  constructor(@InjectRepository(Player) 
    private PlayerRepository: Repository<Player>) {}

  async findAll(): Promise<Player[]> {
    return await this.PlayerRepository.find();
  }

  async findOne(id: number): Promise<Player | undefined> {
    return await this.PlayerRepository.findOne(id);
  }

  async create(player: Player): Promise<Player> {
    return await this.PlayerRepository.save(player);
  }

  async update(id: number, player: Player): Promise<UpdateResult> {
    return await this.PlayerRepository.update(id, player);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.PlayerRepository.delete(id);
  }
}