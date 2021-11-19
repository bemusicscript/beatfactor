import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly fp: number;

  @IsNumber()
  readonly playCount: number;

  @IsString()
  readonly avatar: string;

  @IsNumber()
  readonly rank: number;

  @IsString({ each: true })
  readonly roles: string[];
}