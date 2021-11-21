import { IsArray, IsNumber, IsString } from "class-validator";

export class HandScoreDto {
  @IsString()
  type: string;

  @IsNumber()
  badCut: number;

  @IsNumber()
  miss: number;

  @IsNumber()
  handMovementDistance: number;

  @IsNumber()
  saberMovementDistance: number;

  @IsArray()
  combo: number[];
}