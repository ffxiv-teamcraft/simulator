import { QualityAction } from '../quality-action';
import { Simulation } from '../../../simulation/simulation';
import { CraftingJob } from '../../crafting-job.enum';
import { Observe } from '../other/observe';

export class FocusedTouch extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 68 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 18;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return simulationState.hasComboAvailable(new Observe().getIds()[0]) ? 100 : 50;
  }

  getIds(): number[] {
    return [100243, 100244, 100245, 100246, 100247, 100248, 100249, 100250];
  }

  getPotency(simulation: Simulation): number {
    return 150;
  }
}
