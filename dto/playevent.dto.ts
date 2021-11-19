import { IsDate, IsNumber, IsString } from "class-validator";

export class PlayEventDto {
  @IsString()
  type: string;

  @IsDate()
  startTime: Date;

  @IsNumber()
  duration: number;
}