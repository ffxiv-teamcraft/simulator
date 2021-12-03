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
    return 18;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 5;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 180;
  }

  getIds(): number[] {
    return [100427, 100428, 100429, 100430, 100431, 100432, 100433, 100434];
  }

  getPotency(simulation: Simulation): number {
    return 180;
  }
}
