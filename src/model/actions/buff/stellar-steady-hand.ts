import { BuffAction } from '../buff-action';
import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { CraftingJob } from '../../crafting-job.enum';

export class StellarSteadyHand extends BuffAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 1 };
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 0;
  }

  getBuff(): Buff {
    return Buff.STELLAR_STEADY_HAND;
  }

  getDuration(simulation: Simulation): number {
    return 3;
  }

  getIds(): number[] {
    return [46843, 46843, 46843, 46843, 46843, 46843, 46843, 46843];
  }

  getInitialStacks(): number {
    return 0;
  }

  canBeClipped(): boolean {
    return true;
  }

  getTick(): ((simulation: Simulation) => void) | undefined {
    return undefined;
  }
}
