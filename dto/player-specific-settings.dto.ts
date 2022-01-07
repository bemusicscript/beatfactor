import { IsNumber, IsBoolean } from "class-validator";

export class PlayerSpecificSettingsDto {
    @IsBoolean()
    leftHanded: boolean;
    @IsNumber()
    playerHeight: number;
    @IsBoolean()
    automaticPlayerHeight: boolean;
    @IsNumber()
    sfxVolume: number;
    @IsBoolean()
    reduceDebris: boolean;
    @IsBoolean()
    noTextsAndHuds: boolean;
    @IsBoolean()
    noFailEffects: boolean;
    @IsBoolean()
    advancedHud: boolean;
    @IsBoolean()
    autoRestart: boolean;
    @IsNumber()
    saberTrailIntensity: number;
    @IsNumber()
    noteJumpDurationTypeSettings: number;
    @IsNumber()
    noteJumpFixedDuration: number;
    @IsNumber()
    noteJumpStartBeatOffset: number;
    @IsBoolean()
    hideNoteSpawnEffect: boolean;
    @IsBoolean()
    adaptiveSfx: boolean;
    @IsNumber()
    environmentEffectsFilterDefaultPreset: number;
    @IsNumber()
    environmentEffectsFilterExpertPlusPreset: number;
}