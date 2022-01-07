import * as fs from 'fs';
import { InfoDat, RawMapData, Diff } from './datatypes';
import * as Crypto from 'node:crypto';

interface Note {
  _time: number, 
  _lineIndex: number, 
  _lineLayer: number, 
  _type: number, 
  _cutDirection: number, 
  _customData: object
}

function noteFormula(note: Note): number {
  return 108 * note._type + 36 * note._lineLayer + 9 * note._lineIndex + note._cutDirection + 1;
}

function timeFormula(note: Note, bpm: number): number {
  return Math.round(60 / bpm * note._time * 20)
}

function getInfodat(mapDir: string): [InfoDat, string] {
  if (!fs.existsSync(mapDir)) {
    throw new Error(`Map directory ${mapDir} does not exist`);
  }

  const mapFiles = fs.readdirSync(mapDir);
  if (mapFiles.includes('info.dat')) {
    const infodatString = fs.readFileSync(`${mapDir}/info.dat`, 'utf8');
    return [JSON.parse(infodatString) as InfoDat, infodatString];
  }
  else if (mapFiles.includes('Info.dat')) {
    const infodatString = fs.readFileSync(`${mapDir}/Info.dat`, 'utf8');
    return [JSON.parse(infodatString) as InfoDat, infodatString]
  }

  throw new Error(`Map directory ${mapDir} does not contain an info.dat file`);
}

function getDiff(mapDir: string): RawMapData[] {
  let [info, infodatString] = getInfodat(mapDir);
  const diffFiles: [string, string][] = [];

  info._difficultyBeatmapSets.forEach(beatmapSet => {
    beatmapSet._difficultyBeatmaps.forEach(beatmap => {
      diffFiles.push([beatmap._beatmapFilename, beatmap._difficulty]);
    });
  });

  let diffs: RawMapData[] = [];
  const names: string[] = [];
  diffFiles.forEach(([diffFile, difficulty]) => {
    const diffString = fs.readFileSync(`${mapDir}/${diffFile}`, 'utf8');
    infodatString += diffString;
    const diff = { ...JSON.parse(diffString), _difficulty: difficulty, _identifier: `${info._songName} ${difficulty}` } as RawMapData;
    if (diff._notes.length > 100 && diff._notes.length < 5000) { 
      diffs.push(diff); 
    }
  });

  const hash = Crypto.createHash('sha1').update(infodatString).digest('hex').toUpperCase();
  diffs = diffs.map(diff => { diff._mapHash = hash; diff._bpm = info._beatsPerMinute; return diff; });
  return diffs;
}

export function getAllDatasets(mapParentDir: string) {
  const Allmapdata: { [key: string]: Diff } = JSON.parse(fs.readFileSync('./label/v2-all.json', 'utf8'));
  const allMapdataMap = new Map<string, Diff>(Object.entries(Allmapdata));

  const mapDirs = fs.readdirSync(mapParentDir);
  const diffs: RawMapData[] = [];

  mapDirs.forEach(mapDir => {
    const diff = getDiff(`${mapParentDir}/${mapDir}`);
    diffs.push(...diff);
  });

  console.log(`Found ${diffs.length} diffs`);

  const xs_forsave: number[][][] = [];
  const ys_forsave: number[] = [];
  const names_forsave: string[] = [];

  diffs.forEach(diff => {
    const notes: number[] = [];
    const times: number[] = [];
    for (let i = 0; i < diff._notes.length; i++) {
      const currentNote = diff._notes[i];
      if (currentNote._type > 1) continue;
      notes.push(noteFormula(currentNote));
      times.push(timeFormula(currentNote, diff._bpm));
    }

    const mapDiffInfo: Diff | undefined = allMapdataMap.get(diff._mapHash);
    if (mapDiffInfo) {
      const dif = mapDiffInfo.diffs.find(dif => dif.diff === diff._difficulty);
      if (dif) {
        const diffStar = Number(dif.star);
        if (diffStar > 0 && !isNaN(diffStar)) {
          xs_forsave.push([notes, times]);
          ys_forsave.push(diffStar);
          names_forsave.push(diff._identifier);
        }
      }
    }
  });

  console.log(`Found ${xs_forsave.length} diffs`);
  console.log(`Found ${ys_forsave.length} diffs`);
  console.log(`Found ${names_forsave.length} diffs`);

  const time_max = Math.max(...xs_forsave.map(x => Math.max(...x[1])));
  const time_min = Math.min(...xs_forsave.map(x => Math.min(...x[1])));
  console.log(`Max time: ${time_max}`);
  console.log(`Min time: ${time_min}`);

  fs.writeFileSync(`BeatFactor-dataset-train.json`, JSON.stringify({
    xs: xs_forsave,
    ys: ys_forsave,
    names: names_forsave
  }));
}

export function getTestDatasets(mapParentDir: string) {
  const mapDirs = fs.readdirSync(mapParentDir);
  const diffs: RawMapData[] = [];

  mapDirs.forEach(mapDir => {
    const diff = getDiff(`${mapParentDir}/${mapDir}`);
    diffs.push(...diff);
  });

  console.log(`Found ${diffs.length} diffs`);

  const xs_forsave: number[][][] = [];
  const names_forsave: string[] = [];

  diffs.forEach(diff => {
    const notes: number[] = [];
    const times: number[] = [];
    for (let i = 0; i < diff._notes.length; i++) {
      const currentNote = diff._notes[i];
      if (currentNote._type > 1) continue;
      notes.push(noteFormula(currentNote));
      times.push(timeFormula(currentNote, diff._bpm));
    }

    if (Math.max(...times) < 10000) {
      xs_forsave.push([notes, times]);
      names_forsave.push(diff._identifier);
    }
  });

  console.log(`Found ${xs_forsave.length} diffs`);
  console.log(`Found ${names_forsave.length} diffs`);

  const time_max = Math.max(...xs_forsave.map(x => Math.max(...x[1])));
  const time_min = Math.min(...xs_forsave.map(x => Math.min(...x[1])));
  console.log(`Max time: ${time_max}`);
  console.log(`Min time: ${time_min}`);

  fs.writeFileSync(`./src/data.json`, JSON.stringify({
    xs: xs_forsave,
    names: names_forsave
  }));
}

export function getMappingDatasets(mapParentDir: string, windowSize: number, datasetPerDiff: number) {
  const mapDirs = fs.readdirSync(mapParentDir);
  const diffs: RawMapData[] = [];

  mapDirs.forEach(mapDir => {
    const diff = getDiff(`${mapParentDir}/${mapDir}`);
    diffs.push(...diff);
  });

  console.log(`Found ${diffs.length} diffs`);

  const xs_forsave: number[][] = [];
  const ys_forsave: number[][] = [];

  diffs.forEach(diff => {
    const notes: number[] = [];
    for (let i = 0; i < diff._notes.length; i++) {
      const currentNote = diff._notes[i];
      if (currentNote._type > 1) continue;
      notes.push(noteFormula(currentNote));
    }

    for (let i = 0; i < datasetPerDiff; i++) {
      const start = Math.floor(Math.random() * (notes.length - 2 * windowSize));
      const end = start + windowSize;
      const end_end = end + windowSize;

      const window = notes.slice(start, end);
      const label = notes.slice(end, end_end);

      xs_forsave.push(window);
      ys_forsave.push(label);
    }
  });

  console.log(`Found ${xs_forsave.length} diffs`);
  console.log(`Found ${ys_forsave.length} diffs`);

  fs.writeFileSync(`./mapping-dataset.json`, JSON.stringify({
    xs: xs_forsave,
    ys: ys_forsave
  }));
}

getMappingDatasets('./Datasets/AimedHades', 30, 100);