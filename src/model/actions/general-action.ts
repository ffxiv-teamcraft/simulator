import { CraftingAction } from './crafting-action';
import { Simulation } from '../../simulation/simulation';
import { Buff } from '../buff.enum';
import { StepState } from '../step-state';

/**
 * This is for every progress and quality actions
 */
export abstract class GeneralAction extends CraftingAction {
  getDurabilityCost(simulationState: Simulation): number {
    let divider = 1;
    if (simulationState.hasBuff(Buff.WASTE_NOT) || simulationState.hasBuff(Buff.WASTE_NOT_II)) {
      divider *= 2;
    }
    if (simulationState.state === StepState.STURDY || simulationState.state === StepState.ROBUST) {
      divider *= 2;
    }
    return Math.ceil(this.getBaseDurabilityCost(simulationState) / divider);
  }

  _getSuccessRate(simulationState: Simulation): number {
    if (simulationState.hasBuff(Buff.STELLAR_STEADY_HAND)) {
      return 100;
    }
    return this.getBaseSuccessRate(simulationState);
  }

  getBaseBonus(simulation: Simulation): number {
    return 1;
  }

  getBaseCondition(simulation: Simulation): number {
    return 1;
  }

  abstract getPotency(simulation: Simulation): number;

  abstract getBaseDurabilityCost(simulationState: Simulation): number;

  abstract getBaseSuccessRate(simulationState: Simulation): number;
}
