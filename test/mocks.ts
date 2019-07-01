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

export function generateRecipeForIngenuityTests(
  rlvl: number,
  suggestedCraftsmanship?: number
): Craft {
  const suggested: { [index: number]: number } = {
    279: 1056,
    282: 1063,
    285: 1069,
    288: 1075,
    290: 1079,
    300: 1100,
    320: 1320,
    350: 1500,
    380: 1650,
    390: 1320,
    395: 1388,
    400: 1457,
    403: 1498,
    406: 1539,
    409: 1580,
    412: 0,
    415: 0,
    418: 1702,
    420: 1866
  };
  return {
    id: '3864',
    job: 14,
    rlvl: rlvl,
    durability: 40,
    quality: 16557,
    progress: 1733,
    lvl: 75,
    suggestedCraftsmanship: suggestedCraftsmanship || suggested[rlvl] || 0,
    suggestedControl: 1425,
    hq: 1,
    quickSynth: 1,
    ingredients: [
      {
        id: 27773,
        amount: 2,
        quality: 3104.4375
      },
      {
        id: 27774,
        amount: 2,
        quality: 3104.4375
      },
      {
        id: 13,
        amount: 7
      }
    ]
  };
}

export function generateStatsForIngenuityTests(level: number, craftsmanship: number): CrafterStats {
  return new CrafterStats(14, craftsmanship, 1536, 539, true, level, [
    70,
    70,
    70,
    70,
    70,
    70,
    70,
    70
  ]);
}
