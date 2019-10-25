import { CraftingAction } from './crafting-action';
import { Simulation } from '../../simulation/simulation';
import { Buff } from '../buff.enum';

/**
 * This is for every progress and quality actions
 */
export abstract class GeneralAction extends CraftingAction {
  getDurabilityCost(simulationState: Simulation): number {
    const baseCost = this.getBaseDurabilityCost(simulationState);
    if (simulationState.hasBuff(Buff.WASTE_NOT)) {
      return baseCost / 2;
    }
    return baseCost;
  }

  getSuccessRate(simulationState: Simulation): number {
    return this.getBaseSuccessRate(simulationState);
  }

  abstract getPotency(simulation: Simulation): number;

  abstract getBaseDurabilityCost(simulationState: Simulation): number;

  abstract getBaseSuccessRate(simulationState: Simulation): number;
}
