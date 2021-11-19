import { IsNumber, IsString } from "class-validator";

export class HandScoreDto {
  @IsString()
  type: string;

  @IsNumber()
  avgScore: number;

  @IsNumber()
  beforeCutScore: number;

  @IsNumber()
  afterCutScore: number;

  @IsNumber()
  accScore: number;

  @IsNumber()
  badCut: number;

  @IsNumber()
  miss: number;

  @IsNumber()
  handDistance: number;
}