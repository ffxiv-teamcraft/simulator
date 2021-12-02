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
    // TODO fix once servers are up
    return simulationState.hasComboAvailable(new StandardTouch().getIds()[0]) ? 18 : 24;
  }

  getIds(): number[] {
    // TODO fix once servers are up
    return [100002, 100016, 100031, 100076, 100046, 100061, 100091, 100106];
  }

  getPotency(simulation: Simulation): number {
    return 150;
  }
}
