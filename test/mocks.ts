import { CrafterStats } from '../src/model/crafter-stats';
import { Craft } from '../src/model/craft';

export const gradeIIInfusionOfStrRecipe: Craft = {
  id: '32644',
  job: 14,
  rlvl: 350,
  durability: 70,
  quality: 25881,
  progress: 3548,
  lvl: 70,
  stars: 3,
  yield: 3,
  hq: 1,
  quickSynth: 1,
  controlReq: 1350,
  craftsmanshipReq: 1500,
  unlockId: 22315,
  ingredients: [
    {
      id: 21085,
      amount: 1,
      quality: 2680
    },
    {
      id: 19907,
      amount: 1,
      quality: 2573
    },
    {
      id: 19911,
      amount: 2,
      quality: 2546
    },
    {
      id: 20014,
      amount: 1,
      quality: 2591
    },
    {
      id: 19,
      amount: 2
    },
    {
      id: 18,
      amount: 2
    }
  ]
};

export const infusionOfMindRecipe: Craft = {
  id: '3595',
  job: 14,
  rlvl: 288,
  durability: 80,
  quality: 12913,
  progress: 2854,
  lvl: 69,
  yield: 3,
  hq: 1,
  quickSynth: 1,
  ingredients: [
    {
      id: 19872,
      amount: 1,
      quality: 1244
    },
    {
      id: 19907,
      amount: 1,
      quality: 1313
    },
    {
      id: 19915,
      amount: 2,
      quality: 1313
    },
    {
      id: 20013,
      amount: 1,
      quality: 1272
    },
    {
      id: 19,
      amount: 2
    },
    {
      id: 18,
      amount: 1
    }
  ]
};

export const alc70i350Stats: CrafterStats = new CrafterStats(14, 1467, 1468, 474, true, 70, [
  70,
  70,
  70,
  70,
  70,
  70,
  70,
  70
]);

export const acchanStats: CrafterStats = new CrafterStats(14, 1500, 1536, 539, true, 70, [
  70,
  70,
  70,
  70,
  70,
  70,
  70,
  70
]);
