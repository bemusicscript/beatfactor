export type MMA2 = {
  version: string;
}

export type Editors = {
  MMA2: MMA2;
  _lastEditedBy: string;
}

export type CustomData = {
  _contributors: any[];
  _editors: Editors;
}

export type CustomData2 = {
  _editorOffset: number;
  _editorOldOffset: number;
  _warnings: any[];
  _information: any[];
  _suggestions: any[];
  _requirements: any[];
}

export type DifficultyBeatmap = {
  _difficulty: string;
  _difficultyRank: number;
  _beatmapFilename: string;
  _noteJumpMovementSpeed: number;
  _noteJumpStartBeatOffset: number;
  _customData: CustomData2;
}

export type DifficultyBeatmapSet = {
  _beatmapCharacteristicName: string;
  _difficultyBeatmaps: DifficultyBeatmap[];
}

export type InfoDat = {
  _version: string;
  _songName: string;
  _songSubName: string;
  _songAuthorName: string;
  _levelAuthorName: string;
  _beatsPerMinute: number;
  _shuffle: number;
  _shufflePeriod: number;
  _previewStartTime: number;
  _previewDuration: number;
  _songFilename: string;
  _coverImageFilename: string;
  _environmentName: string;
  _songTimeOffset: number;
  _customData: CustomData;
  _difficultyBeatmapSets: DifficultyBeatmapSet[];
}

export type RawMapData = {
  _star: number;
  _mapHash: string;
  _bpm: number;
  _identifier: string;
  _difficulty: string;
  _version: '2.0.0';
  _notes: {
      _time: number;
      _lineIndex: number;
      _lineLayer: number;
      _type: number;
      _cutDirection: number;
      _customData: object;
  }[];
  _obstacles: {
      _time: number;
      _lineIndex: number;
      _type: number;
      _duration: number;
      _width: number;
      _customData: object;
  }[];
  _events: {
      _time: number;
      _type: number;
      _value: number;
      _customData: object;
  }[];
  _customData: object;
};

export interface Diff {
  diffs:         DiffElement[];
  key:           string;
  mapper:        string;
  song:          string;
  bpm:           number;
  downloadCount: number;
  upVotes:       number;
  downVotes:     number;
  heat:          number;
  rating:        number;
  automapper:    null | string;
  uploaddate:    string | null;
}

export interface DiffElement {
  pp:     string;
  star:   string;
  scores: string;
  diff:   string;
  type:   number;
  len:    number;
  njs:    number;
  njt:    number;
  bmb:    number;
  nts:    number;
  obs:    number;
}
