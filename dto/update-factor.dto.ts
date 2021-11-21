import { IsNumber, IsPositive } from "class-validator";

export class UpdateFactorDto {
  @IsNumber()
  @IsPositive()
  factor: number;
}