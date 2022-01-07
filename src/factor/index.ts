import { getTestDatasets } from './dataset';
import util
import * as https from 'https';
import * as fs from 'fs';

export const getFactor = async (maphash: string) => {
 

  https.get(`https://as.cdn.beatsaver.com/${maphash}.zip`, (res) => {
    const stream = fs.createWriteStream(`${__dirname}/maps/${maphash}.zip`);

    res.pipe(stream);
    stream.on('finish', () => {
      stream.close();
      console.log(`Downloaded ${maphash}.zip`);

      const zip = spawn('unzip', [`${__dirname}/maps/${maphash}.zip`, '-d', `${__dirname}/maps/${maphash}`]);
      zip.stdout.on('data', (data) => {
        console.log(`unzip: ${data}`);
      });
    });
  });


  getTestDatasets('./test-data');
  const python = spawn('python', [__dirname + '/src/main.py']);

  python.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
}