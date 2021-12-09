import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { StandardTouch } from './standard-touch';

export class AdvancedTouch extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 84 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  hasCombo(simulation: Simulation): boolean {
    for (let index = simulation.steps.length - 1; index >= 0; index--) {
      const step = simulation.steps[index];
      // If we end up finding the action, the combo is available
      if (
        step.action.getIds()[0] === new StandardTouch().getIds()[0] &&
        step.success &&
        step.combo
      ) {
        return true;
      }
      // If there's an action that isn't skipped (fail or not), combo is broken
      if (!step.skipped) {
        return false;
      }
    }
    return false;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return this.hasCombo(simulationState) ? 18 : 46;
  }

  getIds(): number[] {
    return [100411, 100412, 100413, 100414, 100415, 100416, 100417, 100418];
  }

  getPotency(simulation: Simulation): number {
    return 150;
  }
}
