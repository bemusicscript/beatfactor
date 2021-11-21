import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested, ArrayMaxSize, ArrayMinSize, IsObject, IsDefined, IsNotEmptyObject } from "class-validator";

import { PauseEventDto } from "./pauseevent.dto";
import { HandScoreDto } from "./handscore.dto";
import { SongdataDto } from "./songdata.dto";

export class CreatePlaydataDto {
  @IsNumber()
  rawScore: number;

  @IsNumber()
  modifiedScore: number;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SongdataDto)
  songdata: SongdataDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PauseEventDto)
  pauseEvents: PauseEventDto[];
  
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @Type(() => HandScoreDto)
  handScores: HandScoreDto[];
}