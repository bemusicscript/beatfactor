import { IsDate, IsNumber } from "class-validator";

export class PauseEventDto {
  @IsDate()
  startTime: Date;

  @IsNumber()
  duration: number;
}