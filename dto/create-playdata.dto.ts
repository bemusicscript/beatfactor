import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested, ArrayMaxSize, ArrayMinSize } from "class-validator";

import { PlayEventDto } from "./playevent.dto";
import { HandScoreDto } from "./handscore.dto";

export class CreatePlaydataDto {
  @IsNumber()
  score: number;

  @IsNumber()
  accuracy: number;

  @IsString()
  mapHash: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayEventDto)
  playEvents: PlayEventDto[];
  
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @Type(() => HandScoreDto)
  handScores: HandScoreDto[];
}