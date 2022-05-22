import { Simulation } from '../../simulation/simulation';
import { ActionType } from './action-type';
import { CraftingJob } from '../crafting-job.enum';
import { SimulationFailCause } from '../simulation-fail-cause.enum';
import { Class } from '@kaiu/serializer';
import { StepState } from '../step-state';
import { Tables } from '../tables';

/**
 * This is the parent class of all actions in the simulator.
 */
export abstract class CraftingAction {
  /**
   * checks if the action can be moved inside the simulation state,
   * this is meant to prevent moving automatic actions (looking at you Whistle end progression tick).
   * @returns {boolean}
   */
  public canBeMoved(currentIndex: number): boolean {
    return true;
  }

  public getId(jobId: number): number {
    // Crafter ids are 8 to 15, we want indexes from 0 to 7, so...
    return this.getIds()[jobId - 8] || this.getIds()[0];
  }

  public getWaitDuration(): number {
    return this.getType() === ActionType.BUFF ? 2 : 3;
  }

  /**
   * If an action is skipped on fail, it doesn't tick buffs.
   * Example: Observe, Master's Mend, buffs.
   */
  public skipOnFail(): boolean {
    return false;
  }

  public requiresGood(): boolean {
    return false;
  }

  hasCombo(simulation: Simulation): boolean {
    return false;
  }

  abstract getLevelRequirement(): { job: CraftingJob; level: number };

  abstract getType(): ActionType;

  abstract getIds(): number[];

  abstract _getSuccessRate(simulationState: Simulation): number;

  getSuccessRate(simulationState: Simulation): number {
    const baseRate = this._getSuccessRate(simulationState);
    if (simulationState.state === StepState.CENTERED) {
      return baseRate + 25;
    }
    return baseRate;
  }

  canBeUsed(simulationState: Simulation, linear?: boolean, safeMode?: boolean): boolean {
    const levelRequirement = this.getLevelRequirement();
    const craftsmanshipRequirement = simulationState.recipe.craftsmanshipReq;
    const controlRequirement = simulationState.recipe.controlReq;
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
    if (craftsmanshipRequirement && controlRequirement) {
      return (
        simulationState.crafterStats.craftsmanship >= craftsmanshipRequirement &&
        simulationState.crafterStats._control >= controlRequirement &&
        simulationState.crafterStats.level >= levelRequirement.level &&
        this._canBeUsed(simulationState, linear)
      );
    }
    if (craftsmanshipRequirement) {
      return (
        simulationState.crafterStats.craftsmanship >= craftsmanshipRequirement &&
        simulationState.crafterStats.level >= levelRequirement.level &&
        this._canBeUsed(simulationState, linear)
      );
    }
    if (controlRequirement) {
      return (
        simulationState.crafterStats._control >= controlRequirement &&
        simulationState.crafterStats.level >= levelRequirement.level &&
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
    if (simulationState.success) {
      return undefined;
    }
    const levelRequirement = this.getLevelRequirement();
    const craftsmanshipRequirement = simulationState.recipe.craftsmanshipReq;
    const controlRequirement = simulationState.recipe.controlReq;
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
    if (
      craftsmanshipRequirement &&
      simulationState.crafterStats.craftsmanship < craftsmanshipRequirement
    ) {
      return SimulationFailCause.MISSING_STATS_REQUIREMENT;
    }
    if (controlRequirement && simulationState.crafterStats._control < controlRequirement) {
      return SimulationFailCause.MISSING_STATS_REQUIREMENT;
    }
    return undefined;
  }

  abstract _canBeUsed(simulationState: Simulation, linear?: boolean): boolean;

  public getCPCost(simulationState: Simulation, linear = false): number {
    const baseCost = this.getBaseCPCost(simulationState);
    if (simulationState.state === StepState.PLIANT) {
      return Math.ceil(baseCost / 2);
    }
    return baseCost;
  }

  abstract getBaseCPCost(simulationState: Simulation): number;

  abstract getDurabilityCost(simulationState: Simulation): number;

  abstract execute(simulation: Simulation, safe?: boolean): void;

  public onFail(simulation: Simulation): void {
    // Base onFail does nothing, override to implement it, as it wont be used in most cases.
  }

  public skipsBuffTicks(): boolean {
    return false;
  }

  /**
   * Checks if this action is an instance of a given other action.
   * @param actionClass
   */
  is<T extends CraftingAction>(actionClass: Class<T>): actionClass is Class<T> {
    return this instanceof actionClass;
  }

  public getBaseProgression(simulation: Simulation): number {
    const stats = simulation.crafterStats;
    const baseValue = (stats.craftsmanship * 10) / simulation.recipe.progressDivider + 2;
    if (Tables.LEVEL_TABLE[stats.level] <= simulation.recipe.rlvl) {
      return Math.floor(baseValue * (simulation.recipe.progressModifier || 100) * Math.fround(0.01));
    }
    return Math.floor(baseValue);
  }

  public getBaseQuality(simulation: Simulation): number {
    const stats = simulation.crafterStats;
    const baseValue = (stats.getControl(simulation) * 10) / simulation.recipe.qualityDivider + 35;
    if (Tables.LEVEL_TABLE[stats.level] <= simulation.recipe.rlvl) {
      return Math.floor(baseValue * (simulation.recipe.qualityModifier || 100) * Math.fround(0.01));
    }
    return Math.floor(baseValue);
  }
}
