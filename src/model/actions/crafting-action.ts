import { Simulation } from '../../simulation/simulation';
import { Buff } from '../buff.enum';
import { ActionType } from './action-type';
import { Tables } from '../tables';
import { CrafterStats } from '../crafter-stats';
import { CraftingJob } from '../crafting-job.enum';
import { SimulationFailCause } from '../simulation-fail-cause.enum';
import { Class } from '@kaiu/serializer';
import { CraftLevelDifference, LevelDifference } from '../formulas/craft-level-difference';
import { recipeStars } from '../formulas/recipe-stars';

/**
 * This is the parent class of all actions in the simulator.
 */
export abstract class CraftingAction {
  /**
   * checks if the action can be moved inside the simulation state,
   * this is meant to prevent moving automatic actions (looking at you Whistle end progression tick).
   * @returns {boolean}
   */
  public canBeMoved(): boolean {
    return true;
  }

  public getId(jobId: number): number {
    // Crafter ids are 8 to 15, we want indexes from 0 to 7, so...
    return this.getIds()[jobId - 8] || this.getIds()[0];
  }

  public getWaitDuration(): number {
    return this.getType() === ActionType.BUFF ? 2 : 3;
  }

  abstract getLevelRequirement(): { job: CraftingJob; level: number };

  abstract getType(): ActionType;

  abstract getIds(): number[];

  abstract getSuccessRate(simulationState: Simulation): number;

  canBeUsed(simulationState: Simulation, linear?: boolean, safeMode?: boolean): boolean {
    const levelRequirement = this.getLevelRequirement();
    if (safeMode && this.getSuccessRate(simulationState) < 100) {
      return false;
    }
    if (
      levelRequirement.job !== CraftingJob.ANY &&
      simulationState.crafterStats.levels[levelRequirement.job] !== undefined
    ) {
      return (
        simulationState.crafterStats.levels[levelRequirement.job] >= levelRequirement.level &&
        this._canBeUsed(simulationState, linear)
      );
    }
    return (
      simulationState.crafterStats.level >= levelRequirement.level &&
      this._canBeUsed(simulationState, linear)
    );
  }

  getFailCause(
    simulationState: Simulation,
    linear?: boolean,
    safeMode?: boolean
  ): SimulationFailCause | undefined {
    const levelRequirement = this.getLevelRequirement();
    if (safeMode && this.getSuccessRate(simulationState) < 100) {
      return SimulationFailCause.UNSAFE_ACTION;
    }
    if (
      levelRequirement.job !== CraftingJob.ANY &&
      simulationState.crafterStats.levels[levelRequirement.job] !== undefined
    ) {
      if (simulationState.crafterStats.levels[levelRequirement.job] < levelRequirement.level) {
        return SimulationFailCause.MISSING_LEVEL_REQUIREMENT;
      }
    }
    if (simulationState.crafterStats.level < levelRequirement.level) {
      return SimulationFailCause.MISSING_LEVEL_REQUIREMENT;
    }
    return undefined;
  }

  abstract _canBeUsed(simulationState: Simulation, linear?: boolean): boolean;

  public getCPCost(simulationState: Simulation, linear = false): number {
    return this.getBaseCPCost(simulationState);
  }

  abstract getBaseCPCost(simulationState: Simulation): number;

  abstract getDurabilityCost(simulationState: Simulation): number;

  abstract execute(simulation: Simulation, safe?: boolean): void;

  public onFail(simulation: Simulation): void {
    // Base onFail does nothing, override to implement it, as it wont be used in most cases.
  }

  /**
   * Checks if this action is an instance of a given other action.
   * @param actionClass
   */
  is(actionClass: Class<CraftingAction>): boolean {
    return this instanceof actionClass;
  }

  protected getLevelDifference(simulation: Simulation): LevelDifference {
    let recipeLevel = simulation.recipe.rlvl;
    const stats: CrafterStats = simulation.crafterStats;
    const crafterLevel = Tables.LEVEL_TABLE[stats.level] || stats.level;
    let levelDifference = crafterLevel - recipeLevel;
    const originalLevelDifference = crafterLevel - recipeLevel;
    // If ingenuity
    if (simulation.hasBuff(Buff.INGENUITY)) {
      if (levelDifference < 0 && recipeLevel >= 390) {
        const cap = Math.abs(originalLevelDifference) <= 100 ? -5 : -20;
        levelDifference = Math.max(levelDifference + Math.floor(recipeLevel / 8), cap);
      } else {
        // Shadowbringers
        if (recipeLevel >= 390) {
          levelDifference += Math.floor(recipeLevel / 21.5);
        } else {
          if (recipeLevel === 290) {
            levelDifference += 10;
          } else if (recipeLevel === 300) {
            levelDifference += 9;
          } else if (recipeLevel >= 120) {
            levelDifference += 11;
          } else {
            levelDifference += 5;
          }
          levelDifference = Math.max(levelDifference, -1 * (recipeStars[recipeLevel] || 5));
        }
      }
    }
    levelDifference = Math.min(49, Math.max(-20, levelDifference));
    return CraftLevelDifference.find(
      entry => entry.Difference === levelDifference
    ) as LevelDifference;
  }

  public getBaseProgression(simulation: Simulation): number {
    // Progress = (Craftsmanship + 10000) / (SuggestedCraftsmanship + 10000) * ((Craftsmanship * 21) / 100 + 2) * CraftLevelDifference.Progress / 100
    const stats = simulation.crafterStats;
    return Math.floor(
      (((stats.craftsmanship + 10000) / (simulation.recipe.suggestedCraftsmanship + 10000)) *
        ((stats.craftsmanship * 21) / 100 + 2) *
        this.getLevelDifference(simulation).ProgressFactor) /
        100
    );
  }

  public getBaseQuality(simulation: Simulation): number {
    // Quality = (Control + 10000) / (SuggestedControl + 10000) * ((Control * 35) / 100 + 35) * CraftLevelDifference.Quality / 100
    const stats = simulation.crafterStats;
    return Math.floor(
      (((stats.getControl(simulation) + 10000) / (simulation.recipe.suggestedControl + 10000)) *
        ((stats.getControl(simulation) * 35) / 100 + 35) *
        this.getLevelDifference(simulation).QualityFactor) /
        100
    );
  }
}
