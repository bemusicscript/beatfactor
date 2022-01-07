import { IsBoolean, IsNumber } from "class-validator";

export class GameplayModifiersDto {
    @IsNumber()
    energyType: number;
    @IsBoolean()
    noFailOn0Energy: boolean;
    @IsBoolean()
    demoNoFail: boolean;
    @IsBoolean()
    instaFail: boolean;
    @IsBoolean()
    failOnSaberClash: boolean;
    @IsNumber()
    enabledObstacleType: number;
    @IsBoolean()
    demoNoObstacles: boolean;
    @IsBoolean()
    fastNotes: boolean;
    @IsBoolean()
    strictAngles: boolean;
    @IsBoolean()
    disappearingArrows: boolean;
    @IsBoolean()
    ghostNotes: boolean;
    @IsBoolean()
    noBombs: boolean;
    @IsNumber()
    songSpeed: number;
    @IsBoolean()
    noArrows: boolean;
    @IsBoolean()
    proMode: boolean;
    @IsBoolean()
    zenMode: boolean;
    @IsBoolean()
    smallCubes: boolean;
    @IsNumber()
    songSpeedMul: number;
    @IsNumber()
    cutAngleTolerance: number;
    @IsNumber()
    notesUniformScale: number;
}