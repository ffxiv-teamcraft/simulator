import { ProgressAction } from '../progress-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class BrandOfTheElements extends ProgressAction {
  _canBeUsed(simulationState: Simulation, linear?: boolean): boolean {
    return true;
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 6;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 90;
  }

  getPotency(simulation: Simulation): number {
    let potency = 100;
    if (simulation.hasBuff(Buff.NAME_OF_THE_ELEMENTS)) {
      potency += 200 * (1 - simulation.progression / simulation.recipe.progress);
    }
    return potency;
  }

  getIds(): number[] {
    // TODO replace with real id, this is brand of lightning
    return [100066];
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 37 };
  }
}
