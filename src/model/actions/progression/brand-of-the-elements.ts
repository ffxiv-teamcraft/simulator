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
    return 100;
  }

  getPotency(simulation: Simulation): number {
    return 100;
  }

  getBaseBonus(simulation: Simulation): number {
    if (simulation.hasBuff(Buff.NAME_OF_THE_ELEMENTS)) {
      return (
        1 + (2 * Math.ceil((1 - simulation.progression / simulation.recipe.progress) * 100)) / 100
      );
    }
    return 1;
  }

  getIds(): number[] {
    return [100331, 100332, 100333, 100334, 100335, 100336, 100337, 100338];
  }

  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 37 };
  }
}
