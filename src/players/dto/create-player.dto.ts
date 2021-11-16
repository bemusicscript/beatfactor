import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsNumber()
  fp: number;

  @IsOptional()
  @IsString()
  avatar: string;
}