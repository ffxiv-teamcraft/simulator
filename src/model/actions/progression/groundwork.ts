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
    return 18;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 20;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100403, 100404, 100405, 100406, 100407, 100408, 100409, 100410];
  }

  getPotency(simulation: Simulation): number {
    const basePotency = simulation.crafterStats.level >= 86 ? 360 : 300;
    if (simulation.durability >= this.getDurabilityCost(simulation)) {
      return basePotency;
    }
    return basePotency / 2;
  }
}
