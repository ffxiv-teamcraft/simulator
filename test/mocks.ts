import { CrafterStats } from '../src/model/crafter-stats';
import { Craft } from '../src/model/craft';

export function generateRecipe(
  rlvl: number,
  progress: number,
  quality: number,
  progressDivider: number,
  qualityDivider: number,
  conditionsFlag = 15
): Craft {
  return {
    id: '3864',
    job: 14,
    rlvl: rlvl,
    durability: 80,
    quality: quality || 20287,
    progress: progress || 3943,
    lvl: 80,
    hq: 1,
    quickSynth: 1,
    ingredients: [],
    conditionsFlag: conditionsFlag,
    progressDivider,
    qualityDivider,
  };
}

export function generateStarRecipe(
  rlvl: number,
  progress: number,
  quality: number,
  progressDivider: number,
  qualityDivider: number,
  progressModifier: number,
  qualityModifier: number,
  expert = false,
  conditionsFlag = 15
): Craft {
  return {
    id: '33904',
    job: 14,
    rlvl,
    durability: 70,
    quality,
    progress,
    lvl: 80,
    hq: 1,
    quickSynth: 0,
    ingredients: [],
    expert,
    conditionsFlag,
    progressDivider,
    qualityDivider,
    progressModifier,
    qualityModifier,
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
    level,
  ]);
}
