import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserdataService } from '../user/userdata.service';
import { Userdata } from '../entities/user.entity';

@Injectable()
export class ViewService {
  constructor(
    @Inject(forwardRef(() => UserdataService)) private readonly userdataService: UserdataService
  ) {}

  async findAll(): Promise<Userdata[]> {
    return await this.userdataService.findAllDescFP();
  }

  async findOneDetail(userID: string): Promise<Userdata | undefined> {
    return await this.userdataService.findOneDetail(userID);
  }

  async getScoresaberLink(): Promise<string> {
    return "https://scoresaber.com/";
  }
}


