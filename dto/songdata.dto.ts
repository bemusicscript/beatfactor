import { IsString, IsNumber } from "class-validator";

export class SongdataDto {
  @IsString()
  mapHash: string;

  @IsString()
  songName: string;

  @IsString()
  songSubName: string;

  @IsString()
  songArtist: string;

  @IsString()
  mapAuthor: string;

  @IsNumber()
  maxPossibleScore: number;
}
