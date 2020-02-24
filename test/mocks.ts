import { CrafterStats } from '../src/model/crafter-stats';
import { Craft } from '../src/model/craft';
import { suggested } from './suggested-stats';

export const gradeIIInfusionOfStrRecipe: Craft = {
  id: '32644',
  job: 14,
  rlvl: 350,
  durability: 70,
  quality: 25881,
  progress: 3548,
  lvl: 70,
  suggestedCraftsmanship: 1500,
  suggestedControl: 1350,
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
  suggestedCraftsmanship: 1075,
  suggestedControl: 1050,
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

export const enchantedTruegoldInkRecipe: Craft = {
  id: '3856',
  job: 14,
  rlvl: 390,
  durability: 40,
  quality: 14071,
  progress: 1574,
  lvl: 71,
  suggestedCraftsmanship: 1320,
  suggestedControl: 1220,
  hq: 1,
  quickSynth: 1,
  ingredients: [
    {
      id: 27696,
      amount: 3,
      quality: 2245.37231
    },
    {
      id: 27764,
      amount: 1,
      quality: 2245.37231
    },
    {
      id: 19872,
      amount: 1,
      quality: 1571.76062
    },
    {
      id: 13,
      amount: 6
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

export const alc70i331Stats: CrafterStats = new CrafterStats(14, 1567, 1591, 493, true, 70, [
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

export function generateRecipe(
  rlvl: number,
  progress?: number,
  quality?: number,
  suggestedCraftsmanship?: number,
  suggestedControl?: number
): Craft {
  return {
    id: '3864',
    job: 14,
    rlvl: rlvl,
    durability: 80,
    quality: quality || 20287,
    progress: progress || 3943,
    lvl: 80,
    suggestedCraftsmanship: suggestedCraftsmanship || suggested[rlvl.toString()].craftsmanship || 0,
    suggestedControl: suggestedControl || suggested[rlvl.toString()].control || 1425,
    hq: 1,
    quickSynth: 1,
    ingredients: []
  };
}

export function generateStarRecipe(
  rlvl: number,
  progress: number,
  quality: number,
  requiredCraftsmanship: number,
  requiredControl: number
): Craft {
  return {
    id: '33904',
    job: 14,
    rlvl: rlvl,
    durability: 70,
    quality: quality,
    progress: progress,
    lvl: 80,
    suggestedCraftsmanship: requiredCraftsmanship,
    suggestedControl: requiredControl,
    craftsmanshipReq: requiredCraftsmanship,
    controlReq: requiredControl,
    hq: 1,
    quickSynth: 0,
    ingredients: []
  };
}

export function generateStats(
  level: number,
  craftsmanship: number,
  control = 3000,
  cp = 539
): CrafterStats {
  return new CrafterStats(14, craftsmanship, control, cp, true, level, [
    level,
    level,
    level,
    level,
    level,
    level,
    level,
    level
  ]);
}
