import { ProgressAction } from '../progress-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';

export class Groundwork extends ProgressAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 72 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 24;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 20;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100083];
  }

  getPotency(simulation: Simulation): number {
    if (simulation.durability >= 20) {
      return 300;
    }
    return 150;
  }
}
