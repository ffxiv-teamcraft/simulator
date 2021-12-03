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

  getBaseCPCost(simulationState: Simulation): number {
    return simulationState.hasComboAvailable(new StandardTouch().getIds()[0]) ? 18 : 46;
  }

  getIds(): number[] {
    return [100411, 100412, 100413, 100414, 100415, 100416, 100417, 100418];
  }

  getPotency(simulation: Simulation): number {
    return 150;
  }
}
