import { CrafterStats } from '../src/model/crafter-stats';
import { Craft } from '../src/model/craft';
import { suggested } from './suggested-stats';
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
  expert = false,
  conditionsFlag = 15
): Craft {
  return {
    id: '33904',
    job: 14,
    rlvl: rlvl,
    durability: 70,
    quality: quality,
    progress: progress,
    lvl: 80,
    hq: 1,
    quickSynth: 0,
    ingredients: [],
    expert: expert,
    conditionsFlag: conditionsFlag,
    progressDivider,
    qualityDivider,
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
