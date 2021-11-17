import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult } from "typeorm";

import { Player } from "../models/player.entity";

@Injectable()
export class PlayersService {
  constructor(@InjectRepository(Player) 
    private playerRepository: Repository<Player>) {}

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findOne(id: number): Promise<Player | undefined> {
    return await this.playerRepository.findOne(id);
  }

  async create(player: Player): Promise<Player> {
    return await this.playerRepository.save(player);
  }

  async update(id: number, player: Player): Promise<UpdateResult> {
    return await this.playerRepository.update(id, player);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.playerRepository.delete(id);
  }
}