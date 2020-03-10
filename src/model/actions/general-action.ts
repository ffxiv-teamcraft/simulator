import { CraftingAction } from './crafting-action';
import { Simulation } from '../../simulation/simulation';
import { Buff } from '../buff.enum';
import { StepState } from '../step-state';

/**
 * This is for every progress and quality actions
 */
export abstract class GeneralAction extends CraftingAction {
  getDurabilityCost(simulationState: Simulation): number {
    const baseCost = this.getBaseDurabilityCost(simulationState);
    let cost = baseCost;
    // TODO this is cumulative for now, will require more work once servers are up.
    if (simulationState.hasBuff(Buff.WASTE_NOT) || simulationState.hasBuff(Buff.WASTE_NOT_II)) {
      cost -= baseCost / 2;
    }
    if (simulationState.state === StepState.STURDY) {
      cost -= baseCost / 2;
    }
    return cost;
  }

  _getSuccessRate(simulationState: Simulation): number {
    return this.getBaseSuccessRate(simulationState);
  }

  getBaseBonus(simulation: Simulation): number {
    return 1;
  }

  abstract getPotency(simulation: Simulation): number;

  abstract getBaseDurabilityCost(simulationState: Simulation): number;

  abstract getBaseSuccessRate(simulationState: Simulation): number;
}
