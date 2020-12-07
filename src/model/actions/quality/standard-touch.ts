import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { BasicTouch } from './basic-touch';

export class StandardTouch extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 18 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    const lastAction = simulationState.actions[simulationState.actions.length - 1];
    return lastAction?.is(BasicTouch) ? 18 : 32;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100004, 100018, 100034, 100078, 100048, 100064, 100093, 100109];
  }

  getPotency(simulation: Simulation): number {
    return 125;
  }
}
