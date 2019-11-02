import { createReadStream, writeFileSync } from 'fs';
import * as csv from 'csv-parser';
import { join } from 'path';
import { Tables } from '../src/model/tables';

const cases: any[] = [];

createReadStream(join(__dirname, './ingenuity.csv'))
  .pipe(csv())
  .on('data', data => cases.push(data))
  .on('end', () => {
    processCases();
  });


function processCases(): void {
  const output = cases.map(entry => {
    return {
      clvl: Tables.LEVEL_TABLE[+entry['Crafter level']] || +entry['Crafter level'],
      rlvl: entry.rlvl,
      craftsmanship: entry.Craftsmanship,
      control: entry.Control,
      progress100: entry['Progress for 100%'],
      quality100: entry['Quality for 100%'],
      progress100Ingen: entry['Progress for 100% with Ingen'],
      quality100Ingen: entry['Quality for 100% with Ingen (on normal state)']
    };
  }).filter(entry => {
    console.log(entry);
    return entry.rlvl && entry.progress100 && entry.progress100Ingen && entry.quality100 && entry.quality100Ingen;
  });
  writeFileSync(join(__dirname, '../test/ingenuity-data.json'), JSON.stringify(output, null, 2));
}
