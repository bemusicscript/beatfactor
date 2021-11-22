import { IsNumber, IsPositive, IsString } from "class-validator";

export class UpdateFactorDto {
  @IsNumber()
  @IsPositive()
  factor: number;

  @IsString()
  mapHash: string;

  @IsString()
  gameMode: string;

  @IsString()
  songDifficulty: string;
}