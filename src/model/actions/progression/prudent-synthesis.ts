import { ProgressAction } from '../progress-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { Buff } from '../../buff.enum';

export class PrudentSynthesis extends ProgressAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 88 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return !simulationState.hasBuff(Buff.WASTE_NOT) && !simulationState.hasBuff(Buff.WASTE_NOT_II);
  }

  getBaseCPCost(simulationState: Simulation): number {
    // TODO fix once servers are up
    return 24;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 5;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 180;
  }

  getIds(): number[] {
    // TODO fix once servers are up
    return [100203, 100204, 100205, 100206, 100207, 100208, 100209, 100210];
  }

  getPotency(simulation: Simulation): number {
    return 180;
  }
}
