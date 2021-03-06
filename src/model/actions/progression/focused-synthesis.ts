import { ProgressAction } from '../progress-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { Observe } from '../other/observe';

export class FocusedSynthesis extends ProgressAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 67 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 5;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return simulationState.hasComboAvailable(new Observe().getIds()[0]) ? 100 : 50;
  }

  getIds(): number[] {
    return [100235, 100236, 100237, 100238, 100239, 100240, 100241, 100242];
  }

  getPotency(simulation: Simulation): number {
    return 200;
  }
}
